// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8001/api",
  withCredentials: true, // ✅ Important
});


export default instance;
