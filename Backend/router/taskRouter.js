const express = require('express');
const router = express.Router();
const fetchController = require('../controller/fetchController');
const updateController = require('../controller/updateController');
const { deleteTaskController } = require('../controller/deleteController');
const { createTaskController } = require('../controller/createController');
const { Task } = require('../model/dashboardSchema');

router.get('/tasks', fetchController(Task)); 

router.post('/create/task/:columnName', createTaskController(Task));

router.put('/update/:id', updateController(Task));

router.delete('/delete/:columnId/:taskId', deleteTaskController(Task));

module.exports = router;