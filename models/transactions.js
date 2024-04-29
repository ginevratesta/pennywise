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
      type: Date,
      required: true,
    },

  },
  { timestamps: true, strict: true }
);

const Transactions = mongoose.model("Transactions", TransactionsSchema, "transactions");

module.exports = Transactions;
