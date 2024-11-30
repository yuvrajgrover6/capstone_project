// src/components/RightSidebar.tsx
import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { PostService } from "../services/PostService";
import { UserService } from "../services/UserDetailsService";
import { useLocation, useNavigate } from "react-router-dom";

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
export const RightSidebar: React.FC = () => {
  // const [posts, setPosts] = useState<PostData[]>([]);
  //  const [loading, setLoading] = useState(true);
  //  const [error, setError] = useState<string | null>(null);
  // const [commentsMap, setCommentsMap] = useState<CommentsMap>({});
  // const location = useLocation();

  // const { userDetails, posts } = state;

  //  const { user } = useUser();
  //  const token = user?.token || "";
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);

  //       // Fetch posts
  //       const fetchedPosts: PostData[] = await PostService.getPosts(
  //         1,
  //         10,
  //         token
  //       );

  //       await fetchCommentsForPosts(fetchedPosts); // Fetch comments after posts
  //       // Fetch user details
  //       console.log("fetchpost", fetchedPosts);
  //       const uniqueArtistIds = [
  //         ...new Set(fetchedPosts.map((post) => post.post.artistId)),
  //       ];
  //       const userDetailsMap: { [id: string]: any } = {};

  //       await Promise.all(
  //         uniqueArtistIds.map(async (artistId) => {
  //           try {
  //             const userDetails = await UserService.getUserDetails(
  //               artistId,
  //               token
  //             );
  //             userDetailsMap[artistId] = userDetails; // Map artistId to user details
  //           } catch (error) {
  //             console.error(
  //               `Failed to fetch details for artistId: ${artistId}`,
  //               error
  //             );
  //             userDetailsMap[artistId] = null; // Handle missing details
  //           }
  //         })
  //       );

  //       // Combine posts with user details
  //       const enhancedPosts = fetchedPosts.map((post) => ({
  //         ...post,
  //         userDetails: userDetailsMap[post.post.artistId] || null,
  //       }));

  //       setPosts(enhancedPosts);
  //       console.log("likecheck", posts);
  //     } catch (error) {
  //       setError("Failed to load posts or user details");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [token]);
  // const fetchCommentsForPosts = async (posts: PostData[]) => {
  //   const newCommentsMap: CommentsMap = {};
  //   for (const post of posts) {
  //     try {
  //       console.log(`Fetching comments for postId: ${post.post._id}`);
  //       const comments = await PostService.getComments(post.post._id, token); // Fetch comments for each post
  //       newCommentsMap[post.post._id] = comments;
  //       console.log(`Comments for postId ${post.post._id}:`, comments);
  //     } catch (error) {
  //       console.error(
  //         `Failed to fetch comments for post ${post.post._id}`,
  //         error
  //       );
  //     }
  //   }
  //   setCommentsMap(newCommentsMap);
  //   console.log("Updated comments map:", newCommentsMap);
  // };
  return (
    <aside className="hidden lg:block lg:w-1/4 bg-white p-4 shadow-md rounded-lg">
      <h3 className="font-semibold text-black mb-4">Popular Artists</h3>

      <ul className="space-y-4">
        <li>
          <a href="#" className="text-blue-600 hover:underline">
            Jane Doe
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-600 hover:underline">
            John Smith
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-600 hover:underline">
            Alice Johnson
          </a>
        </li>
      </ul>
    </aside>
  );
};
