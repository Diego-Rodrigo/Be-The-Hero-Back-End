const express = require("express");

const { celebrate, Segments, Joi } = require ('celebrate');

const sessionsController = require ('./Controller/sessionController');

const ongController = require('./Controller/ongController');

const profileController = require('./Controller/profileController');

const incidentController = require('./Controller/incidentController');

const routes = express.Router();

// Validacao BODY,se recebeu o campo ID
routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    })
}), sessionsController.create);

routes.get('/ongs', ongController.index);

// Validacao BODY,se recebeu todos os campos e parametros
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(14),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), ongController.create);

// Validacao do HEADERS, se recebeu authorization , o ID da ONG
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), profileController.index);

// Validacao QUERY se page recebeu um valor numerico
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), incidentController.index);

routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    })
    
}), incidentController.create);

// Validacao do PARAMS se ao deletar recebeu o ID
routes.delete('/incidents/:id',celebrate({
    [Segments.PARAMS]:Joi.object().keys({
        id: Joi.number().required(),
    })
}),incidentController.delete);

module.exports = routes;