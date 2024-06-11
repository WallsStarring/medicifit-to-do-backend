const Joi = require('joi');

const SCHEMA = {
    SIGNUP: {
        body: Joi.object().keys({
            name: Joi.string().trim().required(),
            email: Joi.string().trim().email().trim().required(),
            password: Joi.string().trim().required(),
        }),
    },

    UPDATE: {
        body: Joi.object().keys({
            name: Joi.string().trim().optional(),
        }),
    },

    LOGIN: {
        body: Joi.object().keys({
            email: Joi.string().trim().required(),
            password: Joi.string().trim().required(),
        }),
    },
};

module.exports = { SCHEMA };
