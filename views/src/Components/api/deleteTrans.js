import axios from "axios";

const deleteTrans = async (transactionId) => {
  try {
    await axios.delete(`http://localhost:3023/transactions/${transactionId}`);
  } catch (error) {
    console.error("Error deleting transactions:", error);
    throw error;
  }
};

export default deleteTrans;
