import axios from "axios";

const getGoals = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3023/goals/${userId}`);
    return response.data.goals;
  } catch (error) {
    console.error("Error fetching goals:", error);
    throw new Error("Error");
  }
};

export default getGoals;
