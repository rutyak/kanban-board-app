const express = require('express');
const router = express.Router();
const { Column } = require('../model/dashboardSchema');
const fetchController = require('../controller/fetchController');
const updateController = require('../controller/updateController'); // Ensure updateController is imported
const { createColumnController } = require('../controller/createController');
const { deleteColumnController } = require('../controller/deleteController');

router.get('/columns', fetchController(Column));

router.post('/create/column', createColumnController(Column));

router.put('/update/column/:id', updateController(Column)); 

router.delete('/delete/column/:id', (req, res)=> console.log("req delete column"));

module.exports = router;
