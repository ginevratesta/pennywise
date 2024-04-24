const mongoose = require("mongoose");
const expensesSchema = require("./expenses");

const TransactionsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    income: {
      type: Number,
      required: true,
    },
    
    description: {
      type: String,
      required: true,
    },

    expenses: [expensesSchema],
  },
  { timestamps: true, strict: true }
);

const Transactions = mongoose.model("Transactions", TransactionsSchema, "transactions");

module.exports = Transactions;
