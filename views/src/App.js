import { BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./Components/pages/LoginPage";
import HomePage from "./Components/pages/HomePage";
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home/:userId" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
