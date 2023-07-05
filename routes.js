const express = require('express');
const route = express.Router();

// controllers
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');


// Rotas HOME
route.get('/', homeController.index);


// Rotas de login
route.get('/login', loginController.loginPage);
route.get('/login/register', loginController.registerPage);
route.post('/login', loginController.login);
route.post('/login/register', loginController.register);

module.exports = route;