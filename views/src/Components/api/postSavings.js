import axios from "axios";

const postSavings = async (userId, formData) => {
  try {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/savings/${userId}/`, formData);
    console.log("Savings posted succesfully!");
  } catch (error) {
    console.error("Error posting savings", error);
    throw new Error("Error posting");
  }
};

export default postSavings;
