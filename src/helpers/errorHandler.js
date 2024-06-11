const { HTTP_CODES, MESSAGES } = require('../config');
const { ErrorResponse } = require('./errorResponse');
const { logger } = require('../utils');
const { errorResponse } = require('./response');

// eslint-disable-next-line no-unused-vars
exports.errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    if (error.name === 'SequelizeUniqueConstraintError') {
        error = new ErrorResponse(MESSAGES.EMAIL_ALREADY_EXISTS, HTTP_CODES.BAD_REQUEST);
    }

    if (err.type === 'TypeError') {
        const message = 'TypeError' + err.value;
        error = new ErrorResponse(message, HTTP_CODES.BAD_REQUEST);
    }

    if (err.name === 'CastError') {
        const message = 'Resource not found with ID of ' + err.value;
        error = new ErrorResponse(message, HTTP_CODES.NOT_FOUND);
    }

    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message, HTTP_CODES.BAD_REQUEST);
    }

    if (err.statusCode === 412) {
        const message = error.message.split('/');
        error = new ErrorResponse(message[0].split('"').join(''), HTTP_CODES.BAD_REQUEST);
    }

    errorResponse(res, error.statusCode || 500, error.message || 'Something went wrong. Please try again later.', error.err || {});
};
