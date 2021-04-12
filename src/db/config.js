//Arquivo de configuração do banco de dados
const sqlite3 = require("sqlite3") //busca todas as funções do SQLite3
const {open} = require("sqlite") //busca apenas a função "open" do SQLite

module.exports = () => open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
})