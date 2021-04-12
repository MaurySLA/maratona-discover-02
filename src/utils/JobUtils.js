module.exports = {
    remainingDays(job) { //Função para calcular os dias restantes de um job
        const rstingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
        const createdDate = new Date(job.createdAt)
        const dueDay = createdDate.getDate() + Number(rstingDays)
        const dueDateInMs = createdDate.setDate(dueDay)
        const timeDiffInMs = dueDateInMs - Date.now()
        const dayInMs = (((1000 * 60) * 60) * 24) //Transforma milissegundos em dias
        const dayDiff = Math.ceil(timeDiffInMs / dayInMs)
        return dayDiff
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}