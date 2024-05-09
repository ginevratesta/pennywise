import axios from "axios";

const checkOldPassword = async (userId, password) => {
  console.log(userId, password)
  try {
    const response = await axios.post(`${REACT_APP_URL}/updatePassword/${userId}`, {password});
    console.log(response.data);
  } catch (error) {
    console.error("Error updating password:", error);
    throw new Error("Error updating password");
  }
};

export default checkOldPassword;
