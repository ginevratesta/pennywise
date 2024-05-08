import axios from "axios";

const deleteUser = async (userId) => {
  try {
    await axios.delete(`http://localhost:3023/deleteUser/${userId}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Error deleting");
  }
};

export default deleteUser;
