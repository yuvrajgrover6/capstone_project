// src/components/Post.tsx
import React, { useState } from "react";

interface PostProps {
  artistName: string;
  artistProfile: string;
  artworkUrl: string;
  description: string;
}

export const Post: React.FC<PostProps> = ({
  artistName,
  artistProfile,
  artworkUrl,
  description,
}) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleAddComment = () => {
    if (newComment) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {/* Artist Info */}
      <div className="flex items-center mb-4">
        <img
          src={artistProfile}
          alt={artistName}
          className="w-12 h-12 rounded-full mr-3"
        />
        <div>
          <h4 className="font-semibold">{artistName}</h4>
          <p className="text-gray-500">Artist</p>
        </div>
      </div>

      {/* Artwork */}
      <img
        src={artworkUrl}
        alt="Artwork"
        className="w-full h-64 object-cover rounded-lg mb-4"
      />

      {/* Description */}
      <p className="text-gray-700 mb-4">{description}</p>

      {/* Interaction Buttons */}
      <div className="flex items-center space-x-6 mb-4">
        <button onClick={handleLike} className="text-red-500">
          ❤️ {likes} Likes
        </button>
        <button className="text-blue-500">💬 Comment</button>
        <button className="text-green-500">💰 Fund</button>
      </div>

      {/* Comments */}
      <div className="space-y-2">
        {comments.map((comment, index) => (
          <p key={index} className="text-gray-600">
            {comment}
          </p>
        ))}
      </div>

      {/* Add Comment */}
      <div className="flex mt-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="border rounded-lg flex-grow p-2 mr-2"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Post
        </button>
      </div>
    </div>
  );
};
