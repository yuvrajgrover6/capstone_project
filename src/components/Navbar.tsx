// src/components/Navbar.tsx
import React from "react";

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b shadow-md fixed w-full top-0 z-10">
      <div className="max-w-screen-lg mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="CreativeHub" className="h-10" />
          <input
            type="text"
            placeholder="Search for artists, projects..."
            className="px-4 py-2 border rounded-lg w-80"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-900">Home</button>
          <button className="text-gray-600 hover:text-gray-900">
            My Network
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            Notifications
          </button>
          <img
            src="/user-profile.jpg"
            alt="User profile"
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
};
