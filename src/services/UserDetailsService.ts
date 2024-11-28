import { Post } from "../components/Post";
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
// src/services/profilePicService.ts
export async function uploadProfilePicture(
  userId: string,
  token: string,
  file: File
): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      `${API_URL}upload-profile-pic/${userId}`,
      { file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    if (response.status >= 200 && response.status < 300) {
      const data = await response.data;
      console.log("Profile picture updated:", data);
      return data.body?.url || null; // Return the updated URL
    } else {
      console.error("Failed to upload profile picture");
      return null;
    }
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    return null;
  }
}
