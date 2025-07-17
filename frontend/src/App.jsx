// src/App.jsx

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// Future imports: Login, Register, etc.

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default page loads Home */}
        <Route path="/" element={<Home />} />

        {/* You will later add these */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
