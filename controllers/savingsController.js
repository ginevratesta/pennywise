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

    if (savings.length === 0) {
      return res
        .status(404)
        .json({ message: "No savings found for this user" });
    }

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




