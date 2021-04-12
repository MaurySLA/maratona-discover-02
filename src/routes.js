const express = require("express");
const routes = express.Router();
const ProfileController = require("./controllers/ProfileController")
const JobController = require("./controllers/JobController")
const DashboardController = require("./controllers/DashboardController")

//ROTAS
//As rotas são os caminhos para as páginas, quando clica em cada link dentro da página
//Há uma rota para cada página, sendo que quando entra no '/', ele direciona pro index
//Algumas rotas enviam informações junto para a página, como informações de profile e informações dos jobs cadastrados
//Essas informações adicionais são enviadas junto com a resposta (res) associando um objeto (ou seja '{}')
//As rotas podem ser do tipo 'get' quando se está tentando pegar algo do servidor e 'post' quando se está postando algo, como no caso da página com o formulário.
//Os códigos foram feitos da maneira mais curta, possível quando o retorno é uma única linha.
//Abaixo está o mesmo tipo de código (com a rota para a '/'), mas da maneira mais longa e tradicional:
//routes.get('/job-edit', (request, response) => {
//    return response.render('job-edit')
//})


routes.get('/', DashboardController.index) //Neste caso, puxa a partir do objeto Job a função index
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.show) //Ao invés de direcionar para a página job-edit ele direciona para o id desejado
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

module.exports = routes;