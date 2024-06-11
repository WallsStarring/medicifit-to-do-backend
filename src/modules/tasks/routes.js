const express = require('express');
const CONTROLLER = require('./controller');
const { MDWR } = require('../../middlewares');
const { SCHEMA } = require('./validation');

const router = express.Router();
router.get('/', CONTROLLER.LIST);
router.post('/create', MDWR.validationMiddleware(SCHEMA.ADD), CONTROLLER.ADD);
router.patch('/:id/update', CONTROLLER.UPDATE);
router.delete('/:id/delete', CONTROLLER.DELETE);
module.exports = router;
