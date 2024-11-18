import React, { useEffect, useState } from "react";
import { UserService } from "../services/UserDetailsService";
import { useParams } from "react-router-dom";
import { PostService } from "../services/PostService"; // If you want to fetch posts for this user
import { useUser } from "../context/UserContext";

export const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const token = user?.token || "";

  const fetchUserDetails = async () => {
    try {
      const data = await UserService.getUserDetails(
        userId ? userId : "",
        token
      ); // Fetch user details for this profile
      setUserDetails(data.data);
    } catch (error) {
      setError("Failed to fetch user details");
    }
  };

  const fetchPosts = async () => {
    try {
      const data = await PostService.getPosts(1, 10, token); // Fetch posts for this user
      setPosts(data);
    } catch (error) {
      setError("Failed to fetch posts");
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchPosts();
  }, [userId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!userDetails) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      <img src={userDetails.profilePic} alt={userDetails.name} />
      <h1>{userDetails.name}</h1>
      <p>{userDetails.bio}</p>
      <div>
        <h2>Posts</h2>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};
