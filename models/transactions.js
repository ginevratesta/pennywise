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
      validate: {
        validator: function (v) {
          return /\d{4}-\d{2}-\d{2}/.test(v);
        },
        message: (props) =>
          `${props.value} non è nel formato corretto "YYYY-MM-DD"!`,
      },
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
