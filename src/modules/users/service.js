const { HTTP_CODES, MESSAGES, CONSTANTS } = require('../../config');
const { HELPER } = require('../../helpers');
const { jwt, bcrypt } = require('../../utils');
const db = require('../../database/models');
const { Op } = require('sequelize');

exports.REGISTER = async (payload) => {
    payload.email = payload.email.toLowerCase();
    payload.password = await bcrypt.generatePassword(payload.password);
    const response = await db.UserModel.create(payload);
    if (!response) throw new HELPER.BadRequestException(MESSAGES.BAD_REQUEST);
    return HELPER.serviceResponse(true, HTTP_CODES.CREATED, MESSAGES.CREATED);
};

exports.LOGIN = async (payload) => {
    payload.email = payload.email.toLowerCase();
    const user = await db.UserModel.findOne({ where: { email: payload.email, deletedAt: null } });

    if (!user) throw new HELPER.BadRequestException(MESSAGES.ERROR.LOGIN.USERNAME);

    const isMatch = await bcrypt.verifyPassword(payload.password, user.password);
    if (!isMatch) throw new HELPER.BadRequestException(MESSAGES.ERROR.LOGIN.WRONG_PASS);

    const accessToken = jwt.generateAccessToken({
        id: user.id,
        email: user.email,
        role: CONSTANTS.USER.ROLES.USER,
    });

    const refreshToken = jwt.generateRefreshToken({
        id: user.id,
        email: user.email,
        role: CONSTANTS.USER.ROLES.USER,
    });

    return HELPER.serviceResponse(true, HTTP_CODES.OK, MESSAGES.LOGIN_SUCCESS, {
        id: user.id,
        role: user.role,
        email: user.email,
        accessToken,
        refreshToken,
    });
};

exports.VIEW = async (id) => {
    console.log({ id });
    const findQuery = {};
    findQuery[Op.and] = [];
    findQuery[Op.and].push({ id: id, deletedAt: null });

    const response = await db.UserModel.findOne({
        where: findQuery,
        attributes: ['id', 'role', 'name', 'email', 'status', 'createdAt', 'updatedAt', 'deletedAt'],
    });
    if (!response) throw new HELPER.NotFoundException(MESSAGES.NOT_FOUND);
    return HELPER.serviceResponse(true, HTTP_CODES.OK, MESSAGES.GET_RECORD_SUCCESS, response);
};

exports.UPDATE = async (id, payload) => {
    const findQuery = {};
    findQuery[Op.and] = [];
    findQuery[Op.and].push({ id, deletedAt: null });
    const response = await db.UserModel.findOne({ whire: findQuery });
    if (!response) throw new HELPER.NotFoundException(MESSAGES.NOT_FOUND);
    await db.UserModel.update(payload, {
        where: findQuery,
    });
    return HELPER.serviceResponse(true, HTTP_CODES.OK, MESSAGES.UPDATE_SUCCESS);
};

exports.DELETE = async (id) => {
    const findQuery = {};
    findQuery[Op.and] = [];
    findQuery[Op.and].push({ id, deletedAt: null });
    const response = await db.UserModel.findOne({ whire: findQuery });
    if (!response) throw new HELPER.NotFoundException(MESSAGES.NOT_FOUND);

    await db.UserModel.update(
        { deletedAt: new Date() },
        {
            where: findQuery,
        }
    );

    return HELPER.serviceResponse(true, HTTP_CODES.OK, MESSAGES.DELETE_SUCCESS);
};
