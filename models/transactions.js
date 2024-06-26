const mongoose = require("mongoose");

const TransactionsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["income", "expense"],
    },

    amount: {
      type: Number,
      required: true,
    },

    description: {
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

const Transactions = mongoose.model(
  "Transactions",
  TransactionsSchema,
  "transactions"
);

module.exports = Transactions;
