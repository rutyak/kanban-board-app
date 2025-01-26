const express = require('express');
const router = express.Router();
const { Column } = require('../model/dashboardSchema');
const fetchController = require('../controller/fetchController');
const updateController = require('../controller/updateController');
const { createColumnController } = require('../controller/createController');
const { deleteController } = require('../controller/deleteController');

router.get('/columns', fetchController(Column)); 

router.post('/create/column', createColumnController(Column));

router.put('/update/column/:id', (req, res) => console.log("newName", req.body));

router.delete('/delete/column/:id', deleteController(Column));

module.exports = router;