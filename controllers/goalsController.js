const Goal = require("../models/goals");

exports.createGoal = async (req, res) => {
  const { userId } = req.params;
  const { amount, description, type, date } = req.body;

  try {
    const goal = new Goal ({
      userId,
      amount,
      description,
      type,
      date
    });

    await goal.save();

    res.status(201).json({ message: "Goal created successfully"});
  } catch (error) {
    console.error("Error creating goal:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.getGoals = async (req, res) => {
  const { userId } = req.params;

  try {
    const goals = await Goal.find({ userId });

    res.status(200).json({ goals });
  } catch (error) {
    console.error("Error fetching goals:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.deleteGoal = async (req, res) => {
  const { goalId } = req.params;

  try {
    const deletedGoal = await Goal.findByIdAndDelete(goalId);

    if (!deletedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    console.error("Error deleting goal:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.deleteAllGoals = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await Goal.deleteMany({ userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No goals found for this user" });
    }

    res.status(200).json({ message: "All goals deleted successfully" });
  } catch (error) {
    console.error("Error deleting goals:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.updateGoal = async (req, res) => {
  const { goalId } = req.params;
  const updates = req.body;

  try {
    const updatedGoal = await Goal.findByIdAndUpdate(
      goalId,
      updates,
      { new: true, runValidators: true } 
    );

    if (!updatedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.status(200).json({ message: "Goal updated successfully", goal: updatedGoal });
  } catch (error) {
    console.error("Error updating goal:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
