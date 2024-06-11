const Joi = require('joi');

const SCHEMA = {
    ADD: {
        body: Joi.object().keys({
            title: Joi.string().trim().required(),
            description: Joi.string().optional(),
            dueDate: Joi.date().optional()
        }),
    },

    UPDATE: {
        body: Joi.object().keys({
            title: Joi.string().trim().optional(),
            //description: Joi.string().trim().email().trim().optional(),
            //dueDate: Joi.date().optional()
        }),
    },
};

module.exports = { SCHEMA };
