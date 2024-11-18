import React, { useState } from "react";
import { signup } from "../services/AuthService"; // Your API service

interface SignupFormProps {
  type: string; // Add "user" here if this is required
  onClose: () => void; // Function to close the modal
  openLogin: () => void; // Function to open the login modal
}

const SignupForm: React.FC<SignupFormProps> = ({
  type,
  onClose,
  openLogin,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    // photoUrl: "", // Optional for artists
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // Success state for the popup

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userData = { ...formData, type };
      await signup(userData); // Call API
      setSuccess(true); // Set success to true to show the success message
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle the transition from signup success to login modal
  const handleSuccessClose = () => {
    setSuccess(false); // Hide the success message
    onClose(); // Close the signup modal
    openLogin(); // Open the login modal
  };

  console.log("type", type);

  return (
    <>
      {success ? (
        // Success Message Popup
        <div className="space-y-4 text-center p-4">
          <h2 className="text-xl text-black font-semibold mb-2">
            Account Created Successfully!
          </h2>
          <p className=" text-black font-semibold mb-2">
            Please log in to continue.
          </p>
          <button
            onClick={handleSuccessClose}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Go to Login
          </button>
        </div>
      ) : (
        // Signup Form
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold text-center mb-4">
            Sign up as {type === "artist" ? "Artist" : "User"}
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
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
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
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

          {/* Optional Profile Picture URL for Artist
          {type === "artist" && (
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
      )}
    </>
  );
};

export default SignupForm;
