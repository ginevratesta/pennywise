import axios from "axios";

const patchGoal = async (goalId, formData) => {
  try {
    await axios.patch(`${process.env.REACT_APP_BASE_URL}/goals/${goalId}`, formData);
    console.log("Goal updated successfully");
  } catch (error) {
    console.error("Error updating Goal:", error);
    throw new Error("Error patching");
  }
};

export default patchGoal;
