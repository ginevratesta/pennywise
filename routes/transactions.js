const express = require('express');
const router = express.Router();
const TransController = require('../controllers/transController');

router.post('/transactions/:userId', TransController.postTrans);

router.post('/transactions/:userId/expenses', TransController.postExpenses);

router.get('/transactions/:userId', TransController.getTrans);









module.exports = router;