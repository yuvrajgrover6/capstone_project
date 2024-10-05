// src/components/Sidebar.tsx
import React from "react";

export const Sidebar: React.FC = () => {
  return (
    <aside className="hidden lg:block lg:w-1/4 bg-white p-4 shadow-md rounded-lg">
      {/* User Profile */}
      <div className="text-center mb-6">
        <img
          src="/user-profile.jpg"
          alt="User Profile"
          className="h-20 w-20 rounded-full mx-auto"
        />
        <h2 className="text-xl font-semibold mt-2">John Doe</h2>
        <p className="text-gray-500">Artist | Painter</p>
      </div>

      {/* Sidebar Links */}
      <ul className="space-y-4">
        <li>
          <a href="#" className="text-blue-600 hover:underline">
            Trending Artists
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-600 hover:underline">
            Top Funded Projects
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-600 hover:underline">
            Explore New Projects
          </a>
        </li>
      </ul>
    </aside>
  );
};
