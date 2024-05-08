import axios from "axios";

const patchSavings = async (savingsId, formData) => {
  try {
    await axios.patch(`http://localhost:3023/savings/${savingsId}`, formData);
    console.log("Savings updated successfully");
  } catch (error) {
    console.error("Error updating savings:", error);
    throw new Error("Error patching");
  }
};

export default patchSavings;
