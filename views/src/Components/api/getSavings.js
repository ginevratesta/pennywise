import axios from "axios";

const getSavings = async (userId) => {
  try {
    const response = await axios.get(`${REACT_APP_URL}/savings/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching savings:", error);
    throw new Error("Error");
  }
};

export default getSavings;
