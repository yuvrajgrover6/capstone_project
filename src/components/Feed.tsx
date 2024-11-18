import React, { useEffect, useState } from "react";
import { PostService } from "../services/PostService";
import { Post } from "./Post";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import { UserService } from "../services/UserDetailsService";
interface PostData {
  id: string;
  title: string;
  body: string;
  artistId: string;
  like_count: number;
  comment_count: number;
  artistName: string;
  artistProfile: string;
  artworkUrl: string;
  description: string;
  _id: string;
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

export const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [commentsMap, setCommentsMap] = useState<CommentsMap>({});
  const [userDetails, setUserDetails] = useState<any>(null); // State to store user details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const token = user?.token || "";

  const fetchPosts = async (pageNumber = 1, pageSize = 10) => {
    try {
      setLoading(true);
      console.log("Fetching posts...");
      const data = await PostService.getPosts(pageNumber, pageSize, token); // Use PostService
      setPosts(data);
      await fetchCommentsForPosts(data); // Fetch comments after posts
    } catch (err: any) {
      setError(err.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const uniqueArtistIds = Array.from(
        new Set(posts.map((post) => post.artistId))
      ); // Extract unique artistIds
      const userDetailsMap: { [id: string]: any } = {};

      for (const artistId of uniqueArtistIds) {
        const data = await UserService.getUserDetails(artistId, token); // Fetch details for each artist
        userDetailsMap[artistId] = data.data; // Map artistId to user details
      }

      setUserDetails(userDetailsMap); // Store all user details in state
    } catch (error) {
      setError("Failed to fetch user details");
    }
  };

  const fetchCommentsForPosts = async (posts: PostData[]) => {
    const newCommentsMap: CommentsMap = {};
    for (const post of posts) {
      try {
        console.log(`Fetching comments for postId: ${post._id}`);
        const comments = await PostService.getComments(post._id, token); // Fetch comments for each post
        newCommentsMap[post._id] = comments;
        console.log(`Comments for postId ${post._id}:`, comments);
      } catch (error) {
        console.error(`Failed to fetch comments for post ${post._id}`, error);
      }
    }
    setCommentsMap(newCommentsMap);
    console.log("Updated comments map:", newCommentsMap);
  };

  useEffect(() => {
    fetchPosts();
    fetchUserDetails(); // Fetch user details when component mounts
  }, []);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full lg:w-2/4 space-y-6">
      {userDetails && (
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={userDetails.profilePic}
            alt={userDetails.name}
            className="w-12 h-12 rounded-full"
          />
          <Link
            to={`/profile/${userDetails.id}`}
            className="font-semibold text-xl"
          >
            {userDetails.name}
          </Link>
        </div>
      )}
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post._id}
            postId={post._id}
            artistName={post.title}
            artistProfile={post.artistProfile}
            artworkUrl={post.artworkUrl}
            description={post.body}
            likeCount={post.like_count}
            commentCount={post.comment_count}
            token={token}
            userID={user?.id || ""}
            id={post.id}
            comments={commentsMap[post._id] || []} // Pass comments for each post
          />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};
