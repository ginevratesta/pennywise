import axios from "axios";

const deleteSavings = async (savingsId) => {
  try {
    await axios.delete(`http://localhost:3023/savings/${savingsId}`);
  } catch (error) {
    console.error("Error deleting savings:", error);
    throw new Error("Error deleting");
  }
};

export default deleteSavings;
