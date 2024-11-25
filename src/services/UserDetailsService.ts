import { apiClient } from "../utils/apiClient"; // Assume you have an apiClient utility to handle the request (axios or fetch)

import axios from "axios";

const API_URL = "http://localhost:3000/user/";

export const UserService = {
  // Fetch all posts with pagination and authentication
  async getUserDetails(userId: string, token: string) {
    try {
      const response = await axios.post(
        `${API_URL}userDetails/${userId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      return response.data.body.user;
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
