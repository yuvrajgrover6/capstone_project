// src/components/Sidebar.tsx
import React, { useState } from "react";
import CreatePostModal from "./CreatePostModal";

interface SidebarProps {
  user: {
    name: string;
    profilePicUrl: string;
    role: string;
    id: string;
    token: string;
  } | null;
  onPostCreated: () => void; // Accept an onPostCreated callback prop
}

export const Sidebar: React.FC<SidebarProps> = ({ user, onPostCreated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreatePostClick = () => {
    setIsModalOpen(true);
  };

  return (
    <aside className="hidden lg:block lg:w-1/4 bg-white p-4 shadow-md rounded-lg">
      {/* User Profile */}
      <div className="text-center mb-6">
        <img
          src={user?.profilePicUrl || "/default-profile.jpg"}
          alt="User Profile"
          className="h-20 w-20 rounded-full mx-auto"
        />
        <h2 className="text-xl text-gray-500 font-semibold mt-2">
          {user?.name || "Guest"}
        </h2>
      </div>

      {/* Sidebar Links */}
      <ul className="space-y-4">
        <li>
          <button
            onClick={handleCreatePostClick}
            className="text-blue-600 hover:underline"
          >
            Create Post
          </button>
        </li>
        {/* Add other links as needed */}
      </ul>

      {/* Create Post Modal */}
      {isModalOpen && (
        <CreatePostModal
          onClose={() => setIsModalOpen(false)}
          user={user}
          onPostCreated={onPostCreated} // Pass the callback here
        />
      )}
    </aside>
  );
};
