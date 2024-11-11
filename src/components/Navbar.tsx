import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { AiOutlineHome, AiOutlineBell, AiOutlineUser } from "react-icons/ai";
import { FaNetworkWired } from "react-icons/fa";

export const Navbar: React.FC = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white border-b shadow-md fixed w-full top-0 z-10">
      <div className="max-w-screen-lg mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient-slide">
            CreativeHub
          </h1>
          <input
            type="text"
            placeholder="Search for artists, projects..."
            className="px-4 py-2 border rounded-lg w-80"
          />
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-gray-600 hover:text-gray-900">
            <AiOutlineHome size={24} />
          </span>
          <span className="text-gray-600 hover:text-gray-900">
            <FaNetworkWired size={24} />
          </span>
          <span className="text-gray-600 hover:text-gray-900">
            <AiOutlineBell size={24} />
          </span>

          {user ? (
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 font-semibold">{user.name}</span>
              <img
                src={user.profilePicUrl || "/default-profile.jpg"}
                alt="User profile"
                className="h-10 w-10 rounded-full object-cover"
              />
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 text-sm font-medium ml-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
