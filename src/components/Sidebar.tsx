import React, { useState } from "react";
import CreatePostModal from "./CreatePostModal"; // Import the CreatePostModal component

interface SidebarProps {
  user: {
    name: string;
    profilePicUrl: string;
    role: string;
    id: string;
  } | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  console.log("sidebar", user);
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
        {/* <p className="text-gray-500">{user?.role || "Role not available"}</p> */}
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
        <CreatePostModal onClose={() => setIsModalOpen(false)} user={user} />
      )}
    </aside>
  );
};
