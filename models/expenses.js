const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  category: {
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
});

module.exports = ExpenseSchema;
