const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointmentController');

router.use('/appointment', appointmentController.create);

module.exports = router;
