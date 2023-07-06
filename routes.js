const express = require('express');
const routes = express.Router();

// controllers
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contactController = require('./src/controllers/contactController');


// Rotas HOME
routes.get('/', homeController.index);

// Rotas de user (user, login, register, logout)
routes.get('/user/login', loginController.loginPage);
routes.get('/user/register', loginController.registerPage);
routes.get('/user/logout', loginController.logout);

routes.post('/user/login', loginController.login);
routes.post('/user/register', loginController.register);

// Rotas de contatos
routes.get('/user', contactController.account);
routes.get('/user/editcontact/:id', contactController.editcontactPage);
routes.get('/user/addcontact', contactController.addcontactPage);

routes.post('/user/editcontact/:id?', contactController.editcontact);
routes.post('/user/addcontact', contactController.addcontact);

module.exports = routes;