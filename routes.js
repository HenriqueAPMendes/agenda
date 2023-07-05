const express = require('express');
const route = express.Router();

// controllers
const homeController = require('./src/controllers/homeController');
const aboutController = require('./src/controllers/aboutController');

// Rotas HOME
route.get('/', homeController.get);
route.post('/', homeController.post)

// Rotas ABOUT
route.get('/about', aboutController.get);


module.exports = route;