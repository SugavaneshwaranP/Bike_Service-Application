// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8002/api",
  withCredentials: true, // ✅ Important
});


export default instance;
