import axios from "axios";

const getGoalSavings = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3023/goalSavings/${userId}`);
    return response.data.goalSavings;
  } catch (error) {
    console.error("Error fetching goal savings:", error);
    throw error;
  }
};

export default getGoalSavings;
