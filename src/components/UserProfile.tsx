import { useLocation, useNavigate } from "react-router-dom";
import { Post } from "./Post";
import React, { useEffect, useState } from "react";
import { PostService } from "../services/PostService";
import { useUser } from "../context/UserContext";
import { UserService } from "../services/UserDetailsService";

interface UserDetails {
  _id: string;
  name: string;
  photoUrl: string;
  followerCount: number;
  followingCount: number;
}

interface PostData {
  isLikedByUser: boolean;
  post: {
    id: string;
    title: string;
    body: string;
    artistId: string;
    like_count: number;
    comment_count: number;
    artistName: string;
    artistProfile: string;
    imageUrl: string;
    description: string;
    _id: string;
  };
  userDetails: any;
}
interface CommentsMap {
  [postId: string]: CommentData[];
}

interface CommentData {
  _id: string;
  body: string;
  createdAt: string;
  userId: string;
}

export const UserProfile: React.FC = () => {
  const [commentsMap, setCommentsMap] = useState<CommentsMap>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const token = user?.token || "";
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as {
    userDetails: UserDetails;
    posts: PostData[];
  };

  const { userDetails, posts } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch posts
        const fetchedPosts: PostData[] = await PostService.getPosts(
          1,
          10,
          token
        );

        await fetchCommentsForPosts(fetchedPosts); // Fetch comments after posts
      } catch (error) {
        setError("Failed to load posts or user details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const fetchCommentsForPosts = async (posts: PostData[]) => {
    console.log("profilepage", posts);

    const newCommentsMap: CommentsMap = {};
    for (const post of posts) {
      try {
        console.log(`Fetching comments for postId: ${post.post._id}`);
        const comments = await PostService.getComments(post.post._id, token); // Fetch comments for each post
        newCommentsMap[post.post._id] = comments;
        console.log(`Comments for postId ${post.post._id}:`, comments);
      } catch (error) {
        console.error(
          `Failed to fetch comments for post ${post.post._id}`,
          error
        );
      }
    }
    setCommentsMap(newCommentsMap);
    console.log("Updated comments map:", newCommentsMap);
  };
  const handlePostClick = (post: PostData) => {
    const filteredPosts = posts.filter(
      (p) => p.post.artistId === post.post.artistId
    );
    navigate("/feed", {
      state: {
        selectedPost: post,
        filteredPosts,
      },
    });
  };
  const handleHomeClick = () => {
    navigate("/home"); // Replace "/" with your actual home route
  };

  return (
    <div className="profile-page h-screen w-screen flex flex-col items-center bg-gray-100">
      <header className="flex items-center justify-between w-full px-6 py-4 bg-white shadow-md">
        <h1 className="text-xl font-bold text-gray-800">Profile</h1>
        <button
          className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleHomeClick}
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 12l9-9 9 9-3 3 6 6-6 6-3-3-9-9z" fill="currentColor" />
          </svg>
        </button>
      </header>

      <main className="flex flex-col space-y-6 px-6 py-10 w-full max-w-3xl">
        <div className="user-info bg-white shadow-md rounded-lg p-6 flex items-center space-x-6">
          {/* Profile Picture */}
          {userDetails.photoUrl ? (
            <img
              src={userDetails.photoUrl}
              alt={userDetails.name}
              className="w-24 h-24 rounded-full border"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
          {/* User Details */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {userDetails.name}
            </h2>
            <p className="text-gray-600">
              {userDetails.followerCount} Followers
            </p>
          </div>
        </div>

        <div className="posts-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.post._id} className="bg-white p-4 rounded-lg shadow">
              <div onClick={() => handlePostClick(post)}>
                <Post
                  key={post.post._id}
                  postId={post.post._id}
                  artistName={post.post.title}
                  artistProfile={post.post.artistProfile}
                  artworkUrl={post.post.imageUrl}
                  description={post.post.body}
                  likeCount={post.post.like_count}
                  commentCount={post.post.comment_count}
                  token={token}
                  userID={user?.id || ""}
                  id={post.post.id}
                  comments={commentsMap[post.post._id] || []}
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
