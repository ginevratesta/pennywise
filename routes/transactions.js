const express = require('express');
const router = express.Router();
const TransController = require('../controllers/transController');

router.post('/transactions/:userId', TransController.postTrans);

router.get('/transactions/:userId', TransController.getTrans);









module.exports = router;