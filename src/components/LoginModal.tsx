// src/components/LoginModal.tsx
import React, { useState } from "react";
import { login } from "../services/AuthService";

export const LoginModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [userType, setUserType] = useState<"artist" | "user">("artist");

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      console.log("formData", formData);
      await login(formData); // Call login service

      alert("Logged in successfully!");
      onClose();
    } catch (error: any) {
      alert("Failed to log in");
    } finally {
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-6">
          Login as {userType === "artist" ? "Artist" : "Funder"}
        </h2>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setUserType("artist")}
            className={`px-4 py-2 mx-2 ${
              userType === "artist"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Artist
          </button>
          <button
            onClick={() => setUserType("user")}
            className={`px-4 py-2 mx-2 ${
              userType === "user"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Funder
          </button>
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border rounded"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700"
        >
          Login
        </button>
      </div>
    </div>
  );
};
