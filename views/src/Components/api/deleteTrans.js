import axios from "axios";

const deleteTrans = async (transactionId) => {
    try{
      const response =  await axios.delete(`http://localhost:3023/transactions/${transactionId}`)
        return response.data
    }catch(error) {
        console.error("Error deleting transactions:", error);
        throw error;
    }
};

export default deleteTrans;