const express = require('express');
const router = express.Router();
const TransController = require('../controllers/transController');

router.post('/transactions/:userId', TransController.postTrans);

router.get('/transactions/:userId', TransController.getTrans);

router.delete('/transactions/:transactionId', TransController.deleteTrans)

router.patch('/transactions/:transactionId', TransController.updateTrans);

router.get('/balance/:userId', TransController.getUserBalance);






module.exports = router;