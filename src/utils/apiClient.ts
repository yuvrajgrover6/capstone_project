import axios from "axios";

// Create an Axios instance with base URL
export const apiClient = axios.create({
  baseURL: "http:localhost:3000", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Optionally, you can add an interceptor to automatically attach the Authorization header
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Or fetch from your user context
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
