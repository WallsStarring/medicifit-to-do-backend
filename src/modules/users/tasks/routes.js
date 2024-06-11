const express = require('express');
const CONTROLLER = require('./controller');
const { MDWR } = require('../../../middlewares');
const { SCHEMA } = require('./validation');
const { CONSTANTS } = require('../../../config');

const router = express.Router();

router.post('/add', MDWR.validateAccessToken(CONSTANTS.USER.ROLES.USER), MDWR.validationMiddleware(SCHEMA.ADD), CONTROLLER.ADD);
router.get(
    '/list',
    MDWR.validateAccessToken(CONSTANTS.USER.ROLES.USER),
    MDWR.validateAccessToken(CONSTANTS.USER.ROLES.USER),
    CONTROLLER.LIST,
);
router.get('/:id/view', MDWR.validateAccessToken(CONSTANTS.USER.ROLES.USER), CONTROLLER.VEIW);
router.patch(
    '/:id/update',
    MDWR.validateAccessToken(CONSTANTS.USER.ROLES.USER),
    MDWR.validationMiddleware(SCHEMA.UPDATE),
    CONTROLLER.UPDATE,
);
router.delete('/:id/delete', MDWR.validateAccessToken(CONSTANTS.USER.ROLES.USER), CONTROLLER.DELETE);

module.exports = router;
