import { BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./Components/pages/LoginPage";
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
