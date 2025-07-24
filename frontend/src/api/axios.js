// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // ✅ match your backend port
});

export default instance;
