const express = require('express');
const { usersRoutes } = require('../modules/users');
const { tasksRoutes } = require('../modules/tasks');
const router = express.Router();

router.use('/users', usersRoutes);
router.use('/tasks', tasksRoutes);

module.exports = router;
