import axios from "axios";

const getUserSavings = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/savingsBalance/${userId}`
    );
    return response.data.savingsBalance;
  } catch (error) {
    console.error("Error getting user savings", error);
    throw new Error("Error");
  }
};

export default getUserSavings;
