import { AuthResponse } from "../models/AuthResponse";
import axios from "axios";

// const API_URL = "http://localhost:3000";

// export async function signup(userData: object): Promise<AuthResponse> {
//   const response = await fetch(`${API_URL}/signup`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to sign up");
//   }

//   return response.json();
// }

// export async function login(credentials: object): Promise<AuthResponse> {
//   const response = await fetch(`${API_URL}/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(credentials),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to log in");
//   }

//   return response.json();
// }

const API_URL = "http://localhost:3000/auth"; // Base URL for your API

// Function to handle user signup
export const signup = async (userData: {
  name: string;
  email: string;
  password: string;
  type: string; // "artist" or "funder"
  photoUrl?: string;
}) => {
  try {
    const user = userData;
    const type = user.type;
    const response = await axios.post(`${API_URL}/signup`, { user, type });
    console.log("response", response);
    return response.data; // Return the response data (e.g., token, user info)
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Signup failed");
  }
};

// Function to handle user login
export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data; // Return token, user info, etc.
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
