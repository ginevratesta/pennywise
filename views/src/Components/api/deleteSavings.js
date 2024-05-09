import axios from "axios";

const deleteSavings = async (savingsId) => {
  try {
    await axios.delete(`${REACT_APP_URL}/savings/${savingsId}`);
  } catch (error) {
    console.error("Error deleting savings:", error);
    throw new Error("Error deleting");
  }
};

export default deleteSavings;
