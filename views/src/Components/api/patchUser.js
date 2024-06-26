import axios from "axios";

const patchUser = async (userId, formData) => {
  try {
    await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/updateUser/${userId}`,
      formData
    );
    console.log("User updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Error patching");
  }
};

export default patchUser;
