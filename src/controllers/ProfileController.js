const Profile = require("../model/Profile")

module.exports = {
        async index(req, res) {
            return res.render('profile', { profile: await Profile.get() })
        },
        async update(req, res) {
            const data = req.body //req.body para pegar os dados
            const weeksPerYear = 52
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12 //Semenas por mês, removendo as férias; grosso modo, média de semanas
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"] //Horas trabalhadas na semana
            const monthlyTotalHours = weekTotalHours * weeksPerMonth
            const valueHour = data["monthly-budget"] / monthlyTotalHours
            const profile = await Profile.get()
            await Profile.update({
                ...profile,
                ...req.body,
                "value-hour": valueHour
            })
            return res.redirect('/profile')
        },
    }