import React, { useState } from "react";
import { signup } from "../services/AuthService"; // Your API service

interface SignupFormProps {
  type: "artist" | "funder" | "user"; // Add "user" here if this is required
  onClose: () => void;
}

// Add the SignupForm component
const SignupForm: React.FC<SignupFormProps> = ({ type, onClose }) => {
  // Add state for form data, loading state, and error message
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photoUrl: "", // Optional for artists
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Add a function to handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add a function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userData = { ...formData, type };
      await signup(userData); // Call API
      alert(`${type} signed up successfully!`);
      onClose();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-center mb-4">
        Sign up as {type === "artist" ? "Artist" : "Funder"}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
          placeholder="Enter your name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
          placeholder="Enter your password"
          required
        />
      </div>

      {/* {type === "artist" && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profile Picture URL
          </label>
          <input
            type="text"
            name="photoUrl"
            value={formData.photoUrl}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Optional"
          />
        </div>
      )} */}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign up"}
      </button>

      {error && <p className="text-red-500 text-center">{error}</p>}
    </form>
  );
};

export default SignupForm;
