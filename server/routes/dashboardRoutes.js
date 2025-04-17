const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboardController');
router.get('/',dashboardController.getTreeview);
router.get('/data',dashboardController.getData);
router.get('/count',dashboardController.getTotalDetection);
router.get('/bar-data',dashboardController.getPieData);
router.get('/line-data',dashboardController.getPieData);
module.exports = router