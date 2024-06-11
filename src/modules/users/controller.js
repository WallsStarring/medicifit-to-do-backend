const SERVICES = require('./service');
const { HELPER } = require('../../helpers');

exports.REGISTER = async (req, res, next) => {
    try {
        const { body } = req;
        const response = await SERVICES.REGISTER(body);
        if (!response.success) {
            return HELPER.errorResponse(res, response.code, response.message, response.data);
        }
        return HELPER.successResponse(res, response.code, response.message, response.data);
    } catch (error) {
        next(error);
    }
};

exports.LOGIN = async (req, res, next) => {
    try {
        const { body } = req;
        const response = await SERVICES.LOGIN(body);
        if (!response.success) {
            return HELPER.errorResponse(res, response.code, response.message, response.data);
        }
        return HELPER.successResponse(res, response.code, response.message, response.data);
    } catch (error) {
        next(error);
    }
};

exports.VIEW = async (req, res, next) => {
    try {
        const { user } = req;
        const response = await SERVICES.VIEW(user.id);
        if (!response.success) {
            return HELPER.errorResponse(res, response.code, response.message, response.data);
        }
        return HELPER.successResponse(res, response.code, response.message, response.data);
    } catch (error) {
        next(error);
    }
};

exports.UPDATE = async (req, res, next) => {
    try {
        const { user, body } = req;
        const response = await SERVICES.UPDATE(user.id, body);

        if (!response.success) {
            return HELPER.errorResponse(res, response.code, response.message, response.data);
        }
        return HELPER.successResponse(res, response.code, response.message, response.data);
    } catch (error) {
        next(error);
    }
};

exports.DELETE = async (req, res, next) => {
    try {
        const { user } = req;
        const response = await SERVICES.DELETE(user.id);
        if (!response.success) {
            return HELPER.errorResponse(res, response.code, response.message, response.data);
        }
        return HELPER.successResponse(res, response.code, response.message, response.data);
    } catch (error) {
        next(error);
    }
};
