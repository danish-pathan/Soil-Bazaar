import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
}

export default App;
