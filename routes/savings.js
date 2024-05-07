const express = require('express');
const router = express.Router();
const SavingsController = require("../controllers/savingsController");

router.post('/savings/:userId/:goalId', SavingsController.createSavings);

router.get('/savings/:userId', SavingsController.getSavings);

router.patch('/savings/:savingsId', SavingsController.updateSavings);

router.delete('/savings/:savingsId', SavingsController.deleteSavings);






module.exports = router;