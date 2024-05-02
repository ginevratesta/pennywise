import axios from "axios";


const getTrans = async (userId) => {
    
    try {
        const response = await axios.get(`http://localhost:3023/transactions/${userId}`);
        return response.data.transactions;
      } catch (error) {
        console.error("Error fetching transactions:", error);
        throw error; 
      }
   };

export default getTrans;