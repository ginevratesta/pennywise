import axios from "axios";

const postGoal = async (userId, formData) => {
  try {
    await axios.post(`http://localhost:3023/goals/${userId}`, formData);
    console.log("Goal posted succesfully!");
  } catch (error) {
    console.error("Error posting goal", error);
  }
};

export default postGoal;
