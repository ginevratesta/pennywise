import axios from "axios";

const deleteTrans = async (transactionId) => {
  try {
    await axios.delete(`${REACT_APP_URL}/transactions/${transactionId}`);
  } catch (error) {
    console.error("Error deleting transactions:", error);
    throw new Error("Error deleting");
  }
};

export default deleteTrans;
