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

const Goal = mongoose.model("Goal", GoalSchema, "goals");

module.exports = Goal;
