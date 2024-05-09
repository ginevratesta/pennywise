const Savings = require("../models/savings");

exports.createSavings = async (req, res) => {
  const { userId } = req.params;
  const { amount, goal, date } = req.body;

  try {
    const savings = new Savings({
      userId,
      amount,
      goal,
      date,
    });

    await savings.save();
    res.status(201).json({ message: "Savings created successfully" });
  } catch (error) {
    console.error("Error creating goal:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.getSavings = async (req, res) => {
  try {
    const { userId } = req.params;
    const savings = await Savings.find({ userId });

    res.status(200).json(savings);
  } catch (error) {
    console.error("Error fetching savings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.updateSavings = async (req, res) => {
  try {
    const { savingsId } = req.params;
    const { amount, goal, date } = req.body;
    const updatedSavings = await Savings.findByIdAndUpdate(savingsId, { amount, goal, date }, { new: true });
    res.status(200).json(updatedSavings);
  } catch (error) {
    console.error("Error updating savings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.deleteSavings = async (req, res) => {
  try {
    const { savingsId } = req.params;
    await Savings.findByIdAndDelete(savingsId);
    res.status(200).json({ message: "Savings deleted successfully" });
  } catch (error) {
    console.error("Error deleting savings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUserSavings = async (req, res) => {
  const { userId } = req.params;

  try {
    const savings = await Savings.find({ userId });
    let savingsBalance = 0;
    savings.forEach((saving) => {
        savingsBalance += saving.amount;
    });
    res.status(200).json({ savingsBalance });
  } catch (error) {
    console.error("Error fetching user savings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.getGoalSavings = async (req, res) => {
  const { userId } = req.params;
  try {
    const savings = await Savings.find({ userId });

    const goalMap = {};
    savings.forEach(saving => {
      if (!goalMap[saving.goal]) {
        goalMap[saving.goal] = {
          goal: saving.goal,
          amount: saving.amount
        };
      } else {
        goalMap[saving.goal].amount += saving.amount;
      }
    });

    const goalSavings = Object.values(goalMap);

    res.status(200).json({ goalSavings });
  } catch (error) {
    console.error("Error fetching goal savings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
