const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['daily', 'monthly'] 
  }
});

const Goal = mongoose.model("Goal", GoalSchema, "goals");

module.exports = Goal;
