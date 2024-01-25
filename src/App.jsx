import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import List from "./components/List";
import HomePage from "./pages/Home";
import Details from "./pages/Details";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/soil/list" element={<List />} />
        <Route path="/product/view/:productId" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
