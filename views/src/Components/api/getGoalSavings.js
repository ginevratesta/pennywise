import axios from "axios";

const getGoalSavings = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/goalSavings/${userId}`
    );
    return response.data.goalSavings;
  } catch (error) {
    console.error("Error fetching goal savings:", error);
    throw new Error("Error");
  }
};

export default getGoalSavings;
