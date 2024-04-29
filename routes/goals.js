const express = require('express');
const router = express.Router();
const GoalController = require('../controllers/goalsController');

router.post('/goals/:userId', GoalController.createGoal);

router.get('/goals/:userId', GoalController.getGoals);

router.delete('/goals/:goalId', GoalController.deleteGoal);

router.delete('/goals/:userId/deleteAll', GoalController.deleteAllGoals);

router.patch('/goals/:goalId', GoalController.updateGoal);



module.exports = router;