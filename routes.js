const express = require('express');
const routes = express.Router();

// controllers
const homeController = require('./src/controllers/homeController');
const userController = require('./src/controllers/loginController');


// Rotas HOME
routes.get('/', homeController.index);

// Rotas de user (user, login, register, logout)
routes.get('/user', userController.account);
routes.get('/user/login', userController.loginPage);
routes.get('/user/register', userController.registerPage);
routes.get('/user/logout', userController.logout);

routes.post('/user/login', userController.login);
routes.post('/user/register', userController.register);

module.exports = routes;