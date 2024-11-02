import axios from "axios";

const API_URL = "http://localhost:3000/homepage";

interface PostData {
  title: string;
  description: string;
  body: string;
  id: string;
}

// PostService for managing post-related API requests
export const PostService = {
  async createPost(postData: PostData, token: string) {
    // const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    console.log("token", token);
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("description", postData.description);
    formData.append("body", postData.body);
    formData.append("artistId", postData.id);
    const data = {
      post: {
        title: postData.title,
        body: postData.body,
        artistId: postData.id,
      },
    };
    console.log("reqdata", data);
    try {
      const response = await axios.post(`${API_URL}/createPost`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to create post");
    }
  },

  // Method to retrieve all posts
  async getPosts() {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token here
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch posts");
    }
  },

  // Method to update a specific post by ID
  async updatePost(postId: string, updateData: Partial<PostData>) {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(`${API_URL}/${postId}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token here
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to update post");
    }
  },
};
