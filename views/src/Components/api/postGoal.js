import axios from "axios";

const postGoal = async (userId, formData) => {
  try {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/goals/${userId}`, formData);
    console.log("Goal posted succesfully!");
  } catch (error) {
    console.error("Error posting goal", error);
    throw new Error("Error posting");
  }
};

export default postGoal;
