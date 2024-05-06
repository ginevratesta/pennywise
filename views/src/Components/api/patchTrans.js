import axios from "axios";

const patchTrans = async (transactionId, formData) => {
  try {
   await axios.patch(
      `http://localhost:3023/transactions/${transactionId}`,
      formData
    );
    console.log("Transaction updated successfully");
  } catch (error) {
    console.error("Error updating transaction:", error);
  }
};


export default patchTrans;