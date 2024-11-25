import React, { useEffect, useState } from "react";
import { PostService } from "../services/PostService";
import { Post } from "./Post";
import { useUser } from "../context/UserContext";
import { Link, useLocation } from "react-router-dom";
import { UserService } from "../services/UserDetailsService";
import { FaUserCircle } from "react-icons/fa";

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

export const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);

  const [commentsMap, setCommentsMap] = useState<CommentsMap>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const token = user?.token || "";
  const location = useLocation();
  const { selectedPost, filteredPosts } = location.state || {};

  // const fetchPosts = async (pageNumber = 1, pageSize = 10) => {
  //   try {
  //     setLoading(true);
  //     console.log("Fetching posts...");
  //     const data = await PostService.getPosts(pageNumber, pageSize, token); // Use PostService
  //     setPosts(data);
  //     await fetchCommentsForPosts(data); // Fetch comments after posts
  //   } catch (err: any) {
  //     setError(err.message || "Failed to load posts");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const fetchUserDetails = async () => {
  //   try {
  //     const uniqueArtistIds = Array.from(
  //       new Set(posts.map((post) => post.artistId))
  //     ); // Extract unique artistIds
  //     const userDetailsMap: { [id: string]: any } = {};
  //     console.log("uniqueArtistIds", uniqueArtistIds);
  //     for (const artistId of uniqueArtistIds) {
  //       const data = await UserService.getUserDetails(artistId, token); // Fetch details for each artist
  //       console.log("userdetails", data);
  //       userDetailsMap[artistId] = data.data; // Map artistId to user details
  //     }

  //     setUserDetails(userDetailsMap); // Store all user details in state
  //   } catch (error) {
  //     setError("Failed to fetch user details");
  //   }
  // };

  // const fetchPostsWithUserDetails = async (posts: any[], token: string) => {
  //   const enhancedPosts = await Promise.all(
  //     posts.map(async (post) => {
  //       try {
  //         const userDetails = await UserService.getUserDetails(
  //           post.artistId,
  //           token
  //         );
  //         console.log("userddd", userDetails);
  //         return { ...post, userDetails }; // Combine post with user details
  //       } catch (error) {
  //         console.error(
  //           `Failed to fetch details for artistId: ${post.artistId}`,
  //           error
  //         );
  //         return { ...post, userDetails: null }; // Add null if fetching fails
  //       }
  //     })
  //   );
  //   return enhancedPosts;
  // };
  // (async () => {
  //   try {
  //     const postsWithDetails = await fetchPostsWithUserDetails(posts, token);

  //     console.log("Posts with User Details:", postsWithDetails);
  //     // setPostDetails(postsWithDetails);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // })();

  // async function fetchPostsOptimized(posts: any[], token: string) {
  //   const uniqueArtistIds = [...new Set(posts.map((post) => post.artistId))];

  //   const userDetailsById: Record<string, any> = {}; // Define as a Record

  //   await Promise.all(
  //     uniqueArtistIds.map(async (artistId) => {
  //       try {
  //         const userDetails = await UserService.getUserDetails(artistId, token);
  //         console.log("userddd", userDetails);

  //         userDetailsById[artistId] = userDetails;
  //       } catch (error) {
  //         console.error(
  //           `Failed to fetch details for artistId: ${artistId}`,
  //           error
  //         );
  //         userDetailsById[artistId] = null; // Handle missing details
  //       }
  //     })
  //   );

  //   return posts.map((post) => ({
  //     ...post,
  //     userDetails: userDetailsById[post.artistId] || null, // Safe access
  //   }));
  // }

  if (selectedPost) {
    return (
      <div className="container">
        <div className="pt-20 w-full w-screen max-w-screen-lg mx-auto flex place-content-center justify-center item-center space-x-6">
          {/* <div className="content pt-20 flex justify-center"> */}{" "}
          {/* Centered content */}
          <div className="w-full lg:w-4/4 space-y-6">
            {selectedPost && (
              <Post
                key={selectedPost._id}
                postId={selectedPost._id}
                artistName={selectedPost.title}
                artistProfile={selectedPost.artistProfile}
                artworkUrl={selectedPost.artworkUrl}
                description={selectedPost.body}
                likeCount={selectedPost.like_count}
                commentCount={selectedPost.comment_count}
                token={token}
                userID={user?.id || ""}
                id={selectedPost.id}
                comments={commentsMap[selectedPost._id] || []}
              />
            )}

            {filteredPosts.length > 0 && (
              <>
                <h2>Other Posts from {selectedPost.name}</h2>
                {filteredPosts
                  .filter((post: PostData) => post._id !== selectedPost._id)
                  .map((post: PostData) => (
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
                      comments={commentsMap[post._id] || []}
                    />
                  ))}
              </>
            )}

            {(!selectedPost || filteredPosts.length === 0) && (
              <p>No posts available</p>
            )}
          </div>
        </div>
      </div>
    );
  }

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
        // Fetch user details
        const uniqueArtistIds = [
          ...new Set(fetchedPosts.map((post) => post.artistId)),
        ];
        const userDetailsMap: { [id: string]: any } = {};

        await Promise.all(
          uniqueArtistIds.map(async (artistId) => {
            try {
              const userDetails = await UserService.getUserDetails(
                artistId,
                token
              );
              userDetailsMap[artistId] = userDetails; // Map artistId to user details
            } catch (error) {
              console.error(
                `Failed to fetch details for artistId: ${artistId}`,
                error
              );
              userDetailsMap[artistId] = null; // Handle missing details
            }
          })
        );

        // Combine posts with user details
        const enhancedPosts = fetchedPosts.map((post) => ({
          ...post,
          userDetails: userDetailsMap[post.artistId] || null,
        }));

        setPosts(enhancedPosts);
      } catch (error) {
        setError("Failed to load posts or user details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);
  console.log("updatedposts", posts);

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

  // useEffect(() => {
  //   fetchPosts();
  //   fetchPostsWithUserDetails(posts, token);
  //   // fetchUserDetails();
  //   // fetchPostsOptimized(posts, token); // Fetch user details when component mounts
  // }, []);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full lg:w-2/4 space-y-6">
      {posts.length > 0 ? (
        posts.map((post) => (
          <>
            <div className="flex items-center space-x-4 mb-6">
              {post.userDetails?.profilePic ? (
                <img
                  src={post.userDetails.profilePic}
                  alt={post.userDetails?.name || "Artist"}
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <FaUserCircle className="w-12 h-12 text-gray-400" />
              )}
              {post.userDetails && post.userDetails._id ? (
                <Link
                  to={`/profile/${post.userDetails._id}`}
                  state={{
                    userDetails: post.userDetails,
                    posts: posts.filter((p) => p.artistId === post.artistId),
                  }}
                  className="font-semibold text-xl"
                >
                  {post.userDetails.name}
                </Link>
              ) : (
                <span className="font-semibold text-xl">Unknown Artist</span>
              )}
            </div>

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
          </>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};
