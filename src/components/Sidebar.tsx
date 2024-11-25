import React, { useState } from "react";
import CreatePostModal from "./CreatePostModal";
import { FaPlus, FaEdit, FaUserCircle } from "react-icons/fa";

interface SidebarProps {
  user: {
    name: string;
    profilePicUrl: string;
    role: string;
    id: string;
    token: string;
  } | null;
  onPostCreated: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ user, onPostCreated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleCreatePostClick = () => {
    setIsModalOpen(true);
  };

  const handleProfilePicUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const response = await fetch(`/api/users/${user.id}/profile-pic`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Profile picture updated:", data);
        // Update the profile picture URL dynamically here
      } else {
        console.error("Failed to upload profile picture");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <aside className="hidden lg:block lg:w-1/4 bg-white p-4 shadow-md rounded-lg">
      {/* User Profile */}
      <div className="text-center mb-6">
        <div className="relative inline-block">
          {/* Profile Picture with Ring */}
          <div className="relative h-20 w-20 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-orange-500 p-[2px] flex items-center justify-center">
            {user?.profilePicUrl !== "/default-profile.jpg" ? (
              <img
                src={user?.profilePicUrl}
                alt="User Profile"
                className="h-full w-full rounded-full object-cover bg-white"
              />
            ) : (
              <FaUserCircle className="text-gray-300 h-full w-full rounded-full bg-white" />
            )}
            <label
              className="absolute bottom-0 right-0 h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer shadow-md"
              title={
                user?.profilePicUrl
                  ? "Edit Profile Picture"
                  : "Add Profile Picture"
              }
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicUpload}
                disabled={isUploading}
              />
              {user?.profilePicUrl ? (
                <FaEdit className="text-white text-sm" />
              ) : (
                <FaPlus className="text-white text-sm" />
              )}
            </label>
          </div>
        </div>
        <h2 className="text-xl text-gray-500 font-semibold mt-4">
          {user?.name || "Guest"}
        </h2>
      </div>

      {/* Sidebar Links */}
      {user?.role === "artist" ? (
        <ul className="space-y-4">
          <li>
            <button
              onClick={handleCreatePostClick}
              className="text-blue-600 hover:underline"
            >
              Create Post
            </button>
          </li>
        </ul>
      ) : null}

      {/* Create Post Modal */}
      {isModalOpen && (
        <CreatePostModal
          onClose={() => setIsModalOpen(false)}
          user={user}
          onPostCreated={onPostCreated}
        />
      )}
    </aside>
  );
};
