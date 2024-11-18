import { apiClient } from "../utils/apiClient"; // Assume you have an apiClient utility to handle the request (axios or fetch)

import axios from "axios";

const API_URL = "http://localhost:3000/user/";

export const UserService = {
  // Fetch all posts with pagination and authentication
  async getUserDetails(artistId: string, token: string) {
    try {
      const response = await axios.get(`${API_URL}user-details/${artistId}`, {
        headers: { Authorization: token },
      });
      return response.data.body.posts;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to load posts");
    }
  },

  // export const getUserDetails = async (userId: string, token: string) => {
  //   try {
  //     const response = await apiClient.get(`/user-details/${userId}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: token,
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     throw new Error("Failed to fetch user details");
  //   }
};
