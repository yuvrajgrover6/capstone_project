import { AuthResponse } from "../models/AuthResponse";

const API_URL = "http://localhost:3000";

export async function signup(userData: object): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to sign up");
  }

  return response.json();
}

export async function login(credentials: object): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Failed to log in");
  }

  return response.json();
}
