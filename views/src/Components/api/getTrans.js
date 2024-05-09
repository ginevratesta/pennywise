import axios from "axios";

const getTrans = async (userId) => {
  try {
    const response = await axios.get(
      `${REACT_APP_URL}/transactions/${userId}`
    );
    return response.data.transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Error");
  }
};

export default getTrans;
