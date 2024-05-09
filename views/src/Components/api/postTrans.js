import axios from "axios";

const postTrans = async (userId, formData) => {
  try {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/transactions/${userId}`, formData);
    console.log("Transaction posted succesfully!");
  } catch (error) {
    console.error("Error posting transaction", error);
    throw new Error("Error posting");
  }
};

export default postTrans;
