// src/components/SignupModal.tsx
import React, { useState } from "react";

interface SignupModalProps {
  onClose: () => void;
  isFunderSignup: boolean; // New prop to indicate funder signup
}

export const SignupModal: React.FC<SignupModalProps> = ({
  onClose,
  isFunderSignup,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"artist" | "funder">(
    isFunderSignup ? "funder" : "artist"
  );

  const handleSignup = () => {
    // Add signup logic here
    console.log(`Signup as ${userType} with`, name, email, password);
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
          Sign Up as {userType === "artist" ? "Artist" : "Funder"}
        </h2>

        {/* If funder signup is true, only display the funder option */}
        {!isFunderSignup && (
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
              onClick={() => setUserType("funder")}
              className={`px-4 py-2 mx-2 ${
                userType === "funder"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Funder
            </button>
          </div>
        )}

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignup}
          className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};
