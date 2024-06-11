const { HTTP_CODES, MESSAGES, CONSTANTS } = require('../../config');
const { HELPER } = require('../../helpers');
const db = require('../../database/models');
const { BadRequestException } = require('../../helpers/errorResponse');
const { serviceResponse } = require('../../helpers/response');
const { Op } = require('sequelize');
const { PGSN } = require('../../utils');

exports.ADD = async (user, task) => {
    // default user
    const options = {};
    options.userId = user.id;
    options.title = task.title;
    options.description = task.description;
    options.dueDate = task.dueDate;
    options.assignedTo = task.assignedTo;
    options.status = task.status;
    const response = await db.TaskModel.create(options);
    if (!response) throw new BadRequestException(MESSAGES.BAD_REQUEST);
    return serviceResponse(true, HTTP_CODES.CREATED, MESSAGES.CREATED, {
        id: response.id,
    });
};
exports.LIST = async (query) => {
    let { page, limit, search } = query;
    const findQuery = {};
    findQuery[Op.and] = [];
    findQuery[Op.and].push({ deletedAt: null });
    if (!page && !limit) {
        page = 1;
        limit = 20;
    } else {
        page = parseInt(page);
        limit = parseInt(limit);
    }
    const offset = page === 1 ? 0 : limit * (page - 1);
    const response = await db.TaskModel.findAndCountAll({
        where: findQuery,
        offset: offset,
        limit: limit,
        order: [['createdAt', 'DESC']],
    });
    if (!response) throw new HELPER.BadRequestException(MESSAGES.BAD_REQUEST);
    return HELPER.serviceResponse(true, HTTP_CODES.OK, MESSAGES.GET_RECORD_SUCCESS, PGSN.getPagingData(response, page, limit));
};


exports.VIEW = async (id) => {
    const findQuery = {};
    findQuery[Op.and] = [];
    findQuery[Op.and].push({ id, deletedAt: null });
    const response = await db.TaskModel.findOne({ where: findQuery });
    if (!response) throw new HELPER.NotFoundException(MESSAGES.NOT_FOUND);
    return HELPER.serviceResponse(true, HTTP_CODES.OK, MESSAGES.GET_SINGLE_RECORD, response);
};

exports.UPDATE = async (id, payload) => {
    const findQuery = {};
    findQuery[Op.and] = [];
    findQuery[Op.and].push({ id, deletedAt: null });
    const response = await db.TaskModel.findOne({ where: findQuery });
    if (!response) throw new HELPER.BadRequestException(MESSAGES.BAD_REQUEST);
    await db.TaskModel.update(payload, {
        where: findQuery,
    });
    return HELPER.serviceResponse(true, HTTP_CODES.OK, MESSAGES.UPDATE_SUCCESS);
};

exports.DELETE = async (id) => {
    const findQuery = {};
    findQuery[Op.and] = [];
    findQuery[Op.and].push({ id, deletedAt: null });
    const response = await db.TaskModel.findOne({ where: findQuery });
    if (!response) throw new HELPER.BadRequestException(MESSAGES.BAD_REQUEST);
    await db.TaskModel.update(
        { deletedAt: new Date() },
        {
            where: findQuery,
        },
    );
    return HELPER.serviceResponse(true, HTTP_CODES.OK, MESSAGES.DELETE_SUCCESS);
};

