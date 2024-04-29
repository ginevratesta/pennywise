const express = require('express');
const router = express.Router();
const TransController = require('../controllers/transController');

router.post('/transactions/:userId', TransController.postTrans);

router.get('/transactions/:userId', TransController.getTrans);

router.delete('/transactions/:transactionId', TransController.deleteSingleTrans)

router.delete('/transactions/:userId/deleteAll', TransController.deleteTrans);

router.patch('/transactions/:transactionId', TransController.updateTrans);









module.exports = router;