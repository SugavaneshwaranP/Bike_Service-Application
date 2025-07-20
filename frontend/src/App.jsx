// src/App.jsx

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard"; 
import CustomerDashboard from "./pages/CustomerDashboard";
import BookService from "./components/BookService";
import MyBookings from "./components/MyBookings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default page loads Home */}
        <Route path="/" element={<Home />} />

        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/login" element={<Login />} />


        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/register" element={<Register />} />
      
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

              <Route path="/user/dashboard" element={<CustomerDashboard/>}/>

              <Route path="/services" element={<BookService />} />
<Route path="/mybookings" element={<MyBookings />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
