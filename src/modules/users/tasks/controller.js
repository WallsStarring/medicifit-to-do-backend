const SERVICES = require('./service');
const { HELPER } = require('../../../helpers');

exports.ADD = async (req, res, next) => {
    try {
        const { body, user } = req;
        body.userId = user.id;
        const response = await SERVICES.ADD(body);
        if (!response.success) return HELPER.errorResponse(res, response.code, response.message, response.data);
        return HELPER.successResponse(res, response.code, response.message, response.data);
    } catch (error) {
        next(error);
    }
};

exports.LIST = async (req, res, next) => {
    try {
        const { query } = req;
        const response = await SERVICES.LIST(query);
        if (!response.success) return HELPER.errorResponse(res, response.code, response.message, response.data);
        return HELPER.successResponse(res, response.code, response.message, response.data);
    } catch (error) {
        next(error);
    }
};

exports.VEIW = async (req, res, next) => {
    try {
        const { params } = req;
        const response = await SERVICES.VIEW(params.id);
        if (!response.success) return HELPER.errorResponse(res, response.code, response.message, response.data);
        return HELPER.successResponse(res, response.code, response.message, response.data);
    } catch (error) {
        next(error);
    }
};

exports.UPDATE = async (req, res, next) => {
    try {
        const { params, body } = req;
        const response = await SERVICES.UPDATE(params.id, body);
        if (!response.success) return HELPER.errorResponse(res, response.code, response.message, response.data);
        return HELPER.successResponse(res, response.code, response.message, response.data);
    } catch (error) {
        next(error);
    }
};

exports.DELETE = async (req, res, next) => {
    try {
        const { params } = req;
        const response = await SERVICES.DELETE(params.id);
        if (!response.success) return HELPER.errorResponse(res, response.code, response.message, response.data);
        return HELPER.successResponse(res, response.code, response.message, response.data);
    } catch (error) {
        next(error);
    }
};
