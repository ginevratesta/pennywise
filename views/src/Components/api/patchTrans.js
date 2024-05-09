import axios from "axios";

const patchTrans = async (transactionId, formData) => {
  try {
    await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/transactions/${transactionId}`,
      formData
    );
    console.log("Transaction updated successfully");
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw new Error("Error patching");
  }
};

export default patchTrans;
