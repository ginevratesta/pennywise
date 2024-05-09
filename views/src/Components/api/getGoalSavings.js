import axios from "axios";

const getGoalSavings = async (userId) => {
  try {
    const response = await axios.get(
      `${REACT_APP_URL}/goalSavings/${userId}`
    );
    return response.data.goalSavings;
  } catch (error) {
    console.error("Error fetching goal savings:", error);
    throw new Error("Error");
  }
};

export default getGoalSavings;
