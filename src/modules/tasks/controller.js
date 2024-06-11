const SERVICES = require('./service');
const { HELPER } = require('../../helpers');

exports.ADD = async (req, res, next) => {
    try {
        const task = req.body;
        const user = { id: 1 };
        const response = await SERVICES.ADD(user, task);
        if (!response.success) {
            return HELPER.errorResponse(res, response.code, response.message, response.data);
        }
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
exports.UPDATE = async (req, res, next) => {
    try {
        const { params } = req;
        const task = req.body;
        const response = await SERVICES.UPDATE(params.id, {
            ...task,
        });
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
        const { params } = req;
        const response = await SERVICES.DELETE(params.id);
        if (!response.success) {
            return HELPER.errorResponse(res, response.code, response.message, response.data);
        }
        return HELPER.successResponse(res, response.code, response.message, response.data);
    } catch (error) {
        next(error);
    }
};
