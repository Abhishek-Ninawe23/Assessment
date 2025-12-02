import axios from 'axios';

// Base URL from Vite env (VITE_ prefix required)
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

//Create axios Instance.
const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Attach token automatically from localStorage (set by Redux slice)
api.interceptors.request.use((config) => {
    try {
        // We store token in localStorage (AuthContext also keeps it)
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

    } catch (error) {
        //ignore because:
        /* 
            *if localStorage throws an harmless error
            *interceptor catches error -> rejects promise
            *axios won't send request
            *you get error even before request hits backend
        */
        console.warn("Could not read token from localStorage", error);
    }
    return config;
},
    (error) => Promise.reject(error)    //if axios fails to build request.
)

api.interceptors.response.use(
    (res) => res,
    (err) => { return Promise.reject(err) }
);

export default api;