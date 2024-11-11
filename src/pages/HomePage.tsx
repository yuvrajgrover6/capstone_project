import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Feed } from "../components/Feed";
import { RightSidebar } from "../components/RightSidebar";
import { useUser } from "../context/UserContext";
import { PostService } from "../services/PostService";

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
}

const HomePage: React.FC = () => {
  const { user } = useUser();
  const token = user?.token || ""; // Provide a fallback if token is undefined
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (pageNumber = 1, pageSize = 10) => {
    if (!token) {
      setError("Please log in to view posts.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await PostService.getPosts(pageNumber, pageSize, token);
      setPosts(data);
    } catch (err: any) {
      setError(err.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [token]); // Depend on token, so fetchPosts reruns when token changes

  const handlePostCreated = () => {
    console.log("Post created! Refreshing feed...");
    fetchPosts(); // Refresh posts after a new post is created
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100">
      <Navbar />
      <div className="pt-20 w-full w-screen max-w-screen-lg mx-auto flex justify-between space-x-6">
        <Sidebar onPostCreated={handlePostCreated} user={user} />
        {loading ? <p>Loading posts...</p> : error ? <p>{error}</p> : <Feed />}
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;
