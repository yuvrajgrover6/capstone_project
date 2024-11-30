// src/components/Post.tsx
import React, { useState, useEffect } from "react";
import { PostService } from "../services/PostService";
import { FaHeart, FaRegHeart, FaComment, FaDonate } from "react-icons/fa";
import { PaymentPage } from "./Payment";
import { ConfirmationPopup } from "./PaymentConfirmationPopup";
import { useNavigate } from "react-router-dom";
import { PaymentService } from "../services/PaymentService";

interface PostProps {
  isLikedByUser: boolean;
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
  comments: CommentData[];
} // Initial comments prop

interface CommentData {
  _id: string;
  body: string;
  createdAt: string;
  userId: string;
}

interface LikeData {
  _id: string;
  postId: string;
  userId: string;
}

export const Post: React.FC<PostProps> = ({
  isLikedByUser,
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
  const [likeDetails, setlikeDetails] = useState<LikeData[]>();

  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false); // State for toggling comment visibility
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const navigate = useNavigate();

  const handleFundClick = () => {
    navigate(`/payment/${postId}`);
  };

  const handleConfirmPayment = () => {
    setShowPaymentPage(false);
    setShowConfirmation(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentPage(false);
    alert("Payment successful!");
  };

  // Fetch comments from API
  const fetchComments = async (pageNumber = 1, pageSize = 10) => {
    try {
      const data = await PostService.getComments(
        postId,
        token,
        pageNumber,
        pageSize
      );
      setPostComments(data);
      // Update the state with fetched comments
    } catch (err) {
      setError("Failed to load comments");
    }
  };
  // Fetch Likes details from API
  const getAllLikes = async (pageNumber = 1, pageSize = 10) => {
    try {
      const data = await PostService.getAllLikes(
        pageNumber,
        pageSize,
        postId,
        token
      );
      console.log("likkkeeekekek", likeDetails);
      setlikeDetails(data); // Update the state with fetched comments
    } catch (err) {
      setError("Failed to load comments");
    }
  };

  // Check if the user has already liked this post

  const getUserTransaction = async () => {
    try {
      const data = await PaymentService.getUserTransaction(token);
      console.log("transaction", data);
    } catch {
      setError("Failed to check like status");
    }
  };

  // Fetch comments initially when component mounts
  useEffect(() => {
    fetchComments(1, 10);
    // checkLikedStatus();
    console.log("isLikedByUser", isLikedByUser);
    getAllLikes(1, 10);
    setIsLiked(isLikedByUser);
    getUserTransaction();
  }, [postId, token]);

  const handleLikeToggle = async (postId: string) => {
    console.log("likepostid", postId);

    try {
      if (isLiked) {
        const like = likeDetails?.find((like) => like.postId === postId);
        if (!like) {
          throw new Error("Like not found for the post");
        }

        await PostService.removeLike(like._id, token);
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
      <img
        src={artworkUrl}
        alt={artistName}
        className="w-full h-64 object-cover rounded-md"
      />
      <h2 className="text-xl text-gray-500 font-semibold mt-2">{artistName}</h2>
      <p className="text-lg text-gray-500 mb-4">{description}</p>
      <div className="flex items-center space-x-4 mb-4">
        {/* Like Button */}
        <span
          onClick={() => {
            handleLikeToggle(postId);
          }}
          className="cursor-pointer text-red-500"
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />} ({likes})
        </span>

        {/* Comment Button */}
        <span
          onClick={handleCommentToggle}
          className="cursor-pointer text-blue-500"
        >
          <FaComment /> ({commentCount})
        </span>

        {/* Fund Button */}
        <span
          onClick={handleFundClick}
          className="cursor-pointer text-green-500"
        >
          <FaDonate /> Fund
        </span>
        {showConfirmation && (
          <ConfirmationPopup
            message="Are you sure you want to proceed to payment?"
            onConfirm={handleConfirmPayment}
            onCancel={() => setShowConfirmation(false)}
          />
        )}

        {/* {showPaymentPage && (
          <PaymentPage
            postId={postId}
            userId={userID}
            token={token}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )} */}
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
