import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL, // e.g., http://localhost:5000
  withCredentials: true, //  Sends cookies with every request
});

export default api;
