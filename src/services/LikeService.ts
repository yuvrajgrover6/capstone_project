import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Replace with your backend URL

// Service to add a like to a post
export const addLike = async (postId: string) => {
  try {
    const token = localStorage.getItem("authToken"); // Assuming you store the auth token in localStorage
    const response = await axios.post(
      `${BASE_URL}/api/like`,
      { like: { postId } },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add like", error);
    throw error;
  }
};
