import axios from "axios";

const deleteUser = async (userId) => {
  try {
    await axios.delete(`${REACT_APP_URL}/deleteUser/${userId}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Error deleting");
  }
};

export default deleteUser;
