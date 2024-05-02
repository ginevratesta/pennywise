import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PennyWiseDataProvider } from "./Context/PennyWiseContext";
import LoginPage from "./Components/pages/LoginPage";
import HomePage from "./Components/pages/HomePage";
import "./App.css";

export const Context = React.createContext();

const App = () => {
  return (
    <BrowserRouter>
      <PennyWiseDataProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home/:userId" element={<HomePage />} />
        </Routes>
      </PennyWiseDataProvider>
    </BrowserRouter>
  );
};

export default App;
