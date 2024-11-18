// src/services/PostService.ts
import axios from "axios";

const API_URL = "http://localhost:3000/homepage";

export const PostService = {
  // Fetch all posts with pagination and authentication
  async getPosts(pageNumber = 1, pageSize = 10, token: string) {
    try {
      const response = await axios.get(`${API_URL}/posts`, {
        params: { pageNumber, pageSize },
        headers: { Authorization: token },
      });
      return response.data.body.posts;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to load posts");
    }
  },

  // Create a new post
  async createPost(
    postData: { title: string; body: string; artistId: any },
    token: string
  ) {
    const data = { post: postData };
    try {
      const response = await axios.post(
        `${API_URL}/createPost`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to create post");
    }
  },

  // Delete a post
  async deletePost(postId: string, token: string) {
    try {
      const response = await axios.delete(`${API_URL}/deletePost/${postId}`, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to delete post");
    }
  },

  // Add a comment to a post
  async addComment(
    id: string,
    postId: string,
    userId: string,
    body: string,
    token: string
  ) {
    const data = { id, postId, userId, body };
    const comment = { comment: data };
    try {
      const response = await axios.post(
        `${API_URL}/addComment`,
        JSON.stringify(comment),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to add comment");
    }
  },

  // Delete a comment
  async deleteComment(commentId: string, token: string) {
    try {
      const response = await axios.delete(
        `${API_URL}/deleteComment/${commentId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to delete comment"
      );
    }
  },

  // Add a like to a post
  async addLike(postId: string, userId: string, token: string, id: string) {
    const data = { id, postId, userId };
    const like = { like: data };

    try {
      const response = await axios.post(
        `${API_URL}/addLike`,
        JSON.stringify(like),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to add like");
    }
  },

  // Remove a like from a post
  async removeLike(likeId: string, token: string) {
    try {
      const response = await axios.delete(`${API_URL}/deleteLike/${likeId}`, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to remove like");
    }
  },

  // Get all comments for a specific post
  async getComments(
    postId: string,
    token: string,
    pageNumber = 1,
    pageSize = 10
  ) {
    try {
      const response = await axios.get(`${API_URL}/getComments/${postId}`, {
        params: { pageNumber, pageSize }, // Add query parameters
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      return response.data.body.comments;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to load comments"
      );
    }
  },
};
