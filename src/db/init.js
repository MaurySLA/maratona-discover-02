//Arquivo de inicialização do banco de dados
const Database = require("./config")

const initDb = { //Cria um objeto com a função init para inicializar
    async init() {
        const db = await Database() //Abre o banco de dados; espera abrir e armazena na variável

        //Como o JS e o DB trabalham separados, é preciso usar as funções async e await par que o JS espere o DB terminar antes de executar o próximo código
        //O código para banco de dados precisa estar entre crases para que seja possível usar a quebra de linha sem que haja erro

        await db.exec(`CREATE TABLE profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget DOUBLE,
            days_per_week DOUBLE,
            hours_per_day DOUBLE,
            vacation_per_year DOUBLE,
            value_hour DOUBLE
        )`);

        await db.exec(`CREATE TABLE jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours DOUBLE,
            total_hours DOUBLE,
            created_at DATETIME
        )`);

        await db.run(`INSERT INTO profile (
            name,
            avatar,
            monthly_budget,
            days_per_week,
            hours_per_day,
            vacation_per_year,
            value_hour
        ) VALUES (
            "Maury Abreu",
            "https://github.com/maurySLA.png",
            5000.0,
            5.0,
            8.0,
            4.0,
            75.0
        );`)

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "Pizzaria Guloso",
            2.0,
            2.0,
            1617514376018
        );
        `)

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "OneTwoProject",
            3.0,
            47.0,
            1617514376018
        );`)

        await db.close() //Fecha o banco de dados
    }
}

//Inicializa o que foi criado
initDb.init()
