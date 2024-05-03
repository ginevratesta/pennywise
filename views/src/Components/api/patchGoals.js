import axios from "axios";

const patchGoal = async (goalId, formData) => {
  try {
    await axios.patch(`http://localhost:3023/goals/${goalId}`, formData);
    console.log("Goal updated successfully");
  } catch (error) {
    console.error("Error updating Goal:", error);
  }
};

export default patchGoal;
