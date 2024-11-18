// src/components/Post.tsx
import React, { useState, useEffect } from "react";
import { PostService } from "../services/PostService";
import { FaHeart, FaRegHeart, FaComment, FaDonate } from "react-icons/fa";

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
  const [isLiked, setIsLiked] = useState(false);
  const [postComments, setPostComments] = useState<CommentData[]>(comments);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false); // State for toggling comment visibility

  // Fetch comments from API
  const fetchComments = async (pageNumber = 1, pageSize = 10) => {
    try {
      const data = await PostService.getComments(
        postId,
        token,
        pageNumber,
        pageSize
      );
      setPostComments(data); // Update the state with fetched comments
    } catch (err) {
      setError("Failed to load comments");
    }
  };

  // Check if the user has already liked this post
  useEffect(() => {
    const checkLikedStatus = async () => {
      try {
        // const liked = await PostService.isPostLiked(postId, userID, token);
        // setIsLiked(liked);
      } catch {
        setError("Failed to check like status");
      }
    };
    checkLikedStatus();
  }, [postId, userID, token]);

  // Fetch comments initially when component mounts
  useEffect(() => {
    fetchComments(1, 10);
  }, [postId]);

  const handleLikeToggle = async () => {
    try {
      if (isLiked) {
        await PostService.removeLike(postId, token);
        setLikes(likes - 1);
      } else {
        await PostService.addLike(postId, userID, token, id);
        setLikes(likes + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      setError("Failed to toggle like");
    }
  };

  const handleCommentToggle = () => {
    setShowComments(!showComments);
  };

  const handleComment = async () => {
    if (newComment.trim()) {
      try {
        await PostService.addComment(id, postId, userID, newComment, token);
        setNewComment("");
        fetchComments(); // Fetch updated comments
      } catch (error) {
        setError("Failed to add comment");
      }
    }
  };

  return (
    <div className="post bg-white p-4 shadow rounded-lg">
      <h2 className="text-xl text-gray-500 font-semibold mt-2">{artistName}</h2>
      <p className="text-lg text-gray-500 mb-4">{description}</p>
      <div className="flex items-center space-x-4 mb-4">
        {/* Like Button */}
        <button onClick={handleLikeToggle} className="text-red-500">
          {isLiked ? <FaHeart /> : <FaRegHeart />} ({likes})
        </button>

        {/* Comment Button */}
        <button onClick={handleCommentToggle} className="text-blue-500">
          <FaComment /> ({commentCount})
        </button>

        {/* Fund Button */}
        <button className="text-green-500">
          <FaDonate /> Fund
        </button>
      </div>

      {/* Display comment input and comments conditionally */}
      {showComments && (
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
        </div>
      )}

      {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
    </div>
  );
};
