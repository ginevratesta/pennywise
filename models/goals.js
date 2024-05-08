const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    savings: {
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
      enum: ["daily", "monthly"],
    },

    date: {
      type: String,
      required: true,
      default: () => new Date().toISOString().substring(0, 10),
    },
  },
  { timestamps: true, strict: true }
);

const Goal = mongoose.model("Goal", GoalSchema, "goals");

module.exports = Goal;
