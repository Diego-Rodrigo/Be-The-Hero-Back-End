const express = require("express");

const sessionsController = require ('./Controller/sessionController');

const ongController = require('./Controller/ongController');

const profileController = require('./Controller/profileController');

const incidentController = require('./Controller/incidentController');

const routes = express.Router();

routes.post('/sessions', sessionsController.create);

routes.get('/ongs', ongController.index);
routes.post('/ongs', ongController.create);

routes.get('/profile', profileController.index);


routes.get('/incidents', incidentController.index);
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);

module.exports = routes;