import axios from "axios";

const getBalance = async (userId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/balance/${userId}`);
    return response.data.balance;
  } catch (error) {
    console.error(`Error getting balance ${error}`);
    throw new Error("Error");
  }
};

export default getBalance;
