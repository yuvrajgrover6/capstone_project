// src/components/Post.tsx
import React, { useState, useEffect } from "react";
import { PostService } from "../services/PostService";

interface PostProps {
  postId: string;
  artistName: string;
  artistProfile: string;
  artworkUrl: string;
  description: string;
  likeCount: number;
  commentCount: number;
  token: string;
  userID: string;
  id: string;
  comments: CommentData[]; // Initial comments prop
}

interface CommentData {
  _id: string;
  body: string;
  createdAt: string;
  userId: string;
}

export const Post: React.FC<PostProps> = ({
  postId,
  artistName,
  artistProfile,
  artworkUrl,
  description,
  likeCount,
  commentCount,
  token,
  userID,
  id,
  comments,
}) => {
  const [likes, setLikes] = useState(likeCount);
  const [postComments, setPostComments] = useState<CommentData[]>(comments);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Fetch comments from API
  const fetchComments = async () => {
    try {
      const data = await PostService.getComments(postId, token);
      setPostComments(data);
    } catch (err) {
      setError("Failed to load comments");
    }
  };

  // Fetch comments initially when component mounts
  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleLike = async () => {
    try {
      await PostService.addLike(postId, userID, token, id);
      setLikes(likes + 1);
    } catch (error) {
      setError("Failed to like post");
    }
  };

  const handleComment = async () => {
    if (newComment.trim()) {
      try {
        await PostService.addComment(id, postId, userID, newComment, token);
        setNewComment("");
        // Fetch the latest comments from the API after posting
        fetchComments();
      } catch (error) {
        setError("Failed to add comment");
      }
    }
  };

  return (
    <div className="post bg-white p-4 shadow rounded-lg">
      <h2 className="text-xl text-gray-500 font-semibold mt-2">{artistName}</h2>
      <p className="text-lg mb-4">{description}</p>
      <div className="flex items-center space-x-4 mb-4">
        <button onClick={handleLike} className="text-blue-500">
          Like ({likes})
        </button>
        <button className="text-green-500">Fund</button>
      </div>
      <div className="mt-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="w-full border p-2 rounded mb-2"
        />
        <button
          onClick={handleComment}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Comment
        </button>
      </div>

      {/* Display comments */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Comments</h3>
        {postComments.length > 0 ? (
          postComments.map((comment) => (
            <div key={comment._id} className="border-t pt-2 mt-2">
              <p className="text-gray-700">{comment.body}</p>
              <p className="text-xs text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};
