import axios from "axios";

const getSavings = async (userId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/savings/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching savings:", error);
    throw new Error("Error");
  }
};

export default getSavings;
