import "./App.css";
import ParentComponent from "./components/ParentComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Authentication/Login";
import Regsiter from "./components/Authentication/Register";
import Questions from "./components/Questions";
import Navbar from "./components/Navbar";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="App">
      <BrowserRouter>
        {user && <Navbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Regsiter />} />
          <Route path="/questions" element={<ParentComponent />} />
          <Route path="/all-questions" element={<Questions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
