// src/components/CreatePostModal.tsx
import React, { useState } from "react";
import { PostService } from "../services/PostService";

interface CreatePostModalProps {
  onClose: () => void;
  onPostCreated: () => void; // New callback function
  user: any;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  onClose,
  onPostCreated,
  user,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [artType, setArtType] = useState("");
  const [id, setId] = useState(user?.id);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("handlesubmit", user);
    e.preventDefault();
    setLoading(true);

    // if (!image) {
    //   alert("Please select an image");
    //   setLoading(false);
    //   return;
    // }

    try {
      const postData = {
        title,
        body,
        artistId: user.id,
      };
      const createdPost = await PostService.createPost(postData, user.token);
      console.log("Post created:", createdPost);

      // Trigger the callback to refetch posts
      onPostCreated();
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Create Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter description"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Art Type
            </label>
            <input
              type="text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="e.g., Painting, Digital Art"
              required
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div> */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Creating Post..." : "Create Post"}
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreatePostModal;
