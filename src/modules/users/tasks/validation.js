const Joi = require('joi');

const SCHEMA = {
    ADD: {
        body: Joi.object().keys({
            name: Joi.string().trim().required(),
            description: Joi.string().trim().required(),
            qty: Joi.number().required(),
            price: Joi.number().required(),
        }),
    },

    UPDATE: {
        body: Joi.object().keys({
            name: Joi.string().trim().optional(),
            description: Joi.string().trim().optional(),
            qty: Joi.number().optional(),
            price: Joi.number().optional(),
        }),
    },
};

module.exports = { SCHEMA };
