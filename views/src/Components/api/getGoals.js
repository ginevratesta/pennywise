import axios from "axios";

const getGoals = async (userId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/goals/${userId}`);
    return response.data.goals;
  } catch (error) {
    console.error("Error fetching goals:", error);
    throw new Error("Error");
  }
};

export default getGoals;
