const express = require('express');
const router = express.Router();
const SavingsController = require("../controllers/savingsController");

router.post('/savings/:userId', SavingsController.createSavings);

router.get('/savings/:userId', SavingsController.getSavings);

router.patch('/savings/:savingsId', SavingsController.updateSavings);

router.delete('/savings/:savingsId', SavingsController.deleteSavings);

router.get('/savingsBalance/:userId', SavingsController.getUserSavings);

router.get('/goalSavings/:userId', SavingsController.getGoalSavings);




module.exports = router;