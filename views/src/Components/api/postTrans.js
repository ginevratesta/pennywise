import axios from "axios";

const postTrans = async (userId, formData) => {
  try {
    await axios.post(`http://localhost:3023/transactions/${userId}`, formData);
    console.log("Transaction posted succesfully!");
  } catch (error) {
    console.error("Error posting transaction", error);
  }
};

export default postTrans;
