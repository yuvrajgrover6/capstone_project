// src/components/Feed.tsx
import React, { useEffect, useState } from "react";
import { Post } from "./Post";
import { PostService } from "../services/PostService"; // Ensure correct path

interface Post {
  artistName: string;
  artistProfile: string;
  artworkUrl: string;
  description: string;
  id: string;
}

export const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch posts when the component mounts
    const fetchPosts = async () => {
      try {
        const data = await PostService.getPosts();
        setPosts(data);
      } catch (err: any) {
        setError(err.message || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full lg:w-2/4 space-y-6">
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <Post
            key={index}
            artistName={post.artistName}
            artistProfile={post.artistProfile}
            artworkUrl={post.artworkUrl}
            description={post.description}
            postId={post.id}
          />
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};
