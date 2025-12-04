import axios from 'axios';
import { toast } from "react-toastify";

// Base URL from env variables
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

//Create axios Instance.
const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true // Enable sending cookies with requests
});


// Response interceptor for toast messages
api.interceptors.response.use(
    (res) => res,
    (err) => {
        const message = err.response?.data?.message || "Something went wrong";
        return Promise.reject(err);
    }
);

export default api;