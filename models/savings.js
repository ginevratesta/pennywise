const mongoose = require("mongoose");

const SavingsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    goal: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
      default: () => new Date().toISOString().substring(0, 10),
    },
  },
  { timestamps: true, strict: true }
);

const Savings = mongoose.model("Savings", SavingsSchema, "savings");

module.exports = Savings;
