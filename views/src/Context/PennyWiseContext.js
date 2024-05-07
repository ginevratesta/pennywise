import { createContext, useContext, useState } from "react";

export const PennyWiseContext = createContext();

export const PennyWiseDataProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [trans, setTrans] = useState([]);
  const [goals, setGoals] = useState([]);
  const [savings, setSavings] = useState([]);
  const [isExpense, setIsExpense] = useState(false);
  const [balance, setBalance] = useState(null);

  const updatesData = (actionState, payload) => {
    switch (actionState) {
      case "setUser": {
        setUser(payload);
        break;
      }
      case "setTrans": {
        setTrans(payload);
        break;
      }
      case "setGoals": {
        setGoals(payload);
        break;
      }
      case "setSavings": {
        setSavings(payload);
        break;
      }
      case "setIsExpense": {
        setIsExpense(payload);
        break;
      }
      case "setBalance": {
        setBalance(payload);
        break;
      }

      default:
        return;
    }
  };

  return (
    <PennyWiseContext.Provider value={{ updatesData, user, trans, goals, savings, isExpense, balance }}>
      {children}
    </PennyWiseContext.Provider>
  );
};

export const useDataPennyWise = () => useContext(PennyWiseContext);
