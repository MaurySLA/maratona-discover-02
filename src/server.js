const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")

//Código abaixo para usar template engine
server.set("view engine", "ejs")

//Muda a localização da pasta views
server.set("views", path.join(__dirname, "views"))

//Antes de entrar no "get", se acrescenta uma funcionalidade ao express habilitando arquivos estáticos.
//Está pedindo ao servidor que use os arquivos estáticos da pasta public.
server.use(express.static("public"))

//A linha abaixo é uma requisição para que o formulário possa pegar o body da requisição (re.body, em routes.js)
server.use(express.urlencoded({ extended: true }))

//Rotas
server.use(routes)

//Abaixo, a constante server pede pro console escrever "Rodando" na porta 3000
server.listen(3000, function () { console.log("Rodando") })



//A função abaixo só executa quando entra na "/", ou seja, no index.
//server.get('/', (request, response) => {
//    console.log("Entrei no index")
//    return response.sendFile(__dirname + '/views/index.html')
//})
//Foi transferido para o routes.js para padronizar as rotas de todas as páginas html.



//server.use(express.static("public"))

//server.get("/", (request, response) => {
//    //console.log("Entrei no index.")
//    return response.sendFile(__dirname + "views/index.html")
//})
//server.listen(3000, () => console.log("Rodando"));