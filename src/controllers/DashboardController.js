const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports ={
    async index (req, res) {
        const jobs = await Job.get();
        const profile = await Profile.get();
        let freeHours = 0;
        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        };
        let jobsTotalHours = 0

        const updatedJobs = jobs.map((job) => {
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? "done" : "progress" //se remaining igual menor a 0, o status é done, senão é progress
            statusCount[status] +=1 //Somando os status; o status no parêntese é o que foi encontrado no map
            //Se o status for 'progress', soma o daily-hours do Job ao total
            jobsTotalHours = status === "progress" ? jobsTotalHours + Number(job["daily-hours"]) : jobsTotalHours
            /* O código abaixo faz o mesmo que o de cima, mas de forma mais longa:
                if (status === "progress"){
                    jobsTotalHours += Number(job["daily-hours"])
                } */
            return { //retorna um novo objeto com tudo que tem em job mais o remaining, o status e o budget (orçamento)
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })
        //Cálculo de horas livres: (qtd horas de trabalho) MENOS (qtd de horas/dia dos Job em progresso)
        freeHours = profile["hours-per-day"] - jobsTotalHours
        //Abaixo, renderiza e devolve a página index com as variáveis de interesse
        return res.render('index', { profile: profile, jobs: updatedJobs, statusCount: statusCount, freeHours: freeHours })
    }
}