// src/components/Feed.tsx
import React from "react";
import { Post } from "./Post";

export const Feed: React.FC = () => {
  const posts = [
    {
      artistName: "Jane Doe",
      artistProfile: "https://via.placeholder.com/150",
      artworkUrl: "https://via.placeholder.com/600",
      description: "Exploring the beauty of nature through abstract painting.",
    },
    {
      artistName: "John Smith",
      artistProfile: "https://via.placeholder.com/150",
      artworkUrl: "https://via.placeholder.com/600",
      description: "A reflection on the urban landscape, with vibrant colors.",
    },
  ];

  return (
    <div className="w-full lg:w-2/4 space-y-6">
      {posts.map((post, index) => (
        <Post
          key={index}
          artistName={post.artistName}
          artistProfile={post.artistProfile}
          artworkUrl={post.artworkUrl}
          description={post.description}
        />
      ))}
    </div>
  );
};
