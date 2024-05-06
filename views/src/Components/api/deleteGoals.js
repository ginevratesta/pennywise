import axios from "axios";

const deleteGoal = async (goalId) => {
  try {
    await axios.delete(`http://localhost:3023/goals/${goalId}`);
  } catch (error) {
    console.error("Error deleting goal:", error);
    throw error;
  }
};

export default deleteGoal;