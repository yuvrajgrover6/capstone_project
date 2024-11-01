// src/controllers/AuthController.ts
import { useState } from "react";
import { signup, login } from "../services/AuthService";
import { AuthResponse } from "../models/AuthResponse";

export function useAuth() {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (userData: {
    name: string;
    email: string;
    password: string;
    type: string;
    photoUrl?: string;
  }) => {
    try {
      const response = await signup(userData);
      setUser(response);
      localStorage.setItem("authToken", response.token); // Store JWT
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await login(credentials);
      console.log(response);
      setUser(response);
      localStorage.setItem("authToken", response.token);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return { user, error, handleSignup, handleLogin, logout };
}
