import axios from "axios";

const getUser = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:3023/getUserById/${userId}`
    );
    return response.data.user;
  } catch (error) {
    console.error("Error fetching logged user:", error);
    throw new Error("Error");
  }
};

export default getUser;
