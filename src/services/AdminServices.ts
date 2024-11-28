import axios from "axios";
const API_URL = "http://localhost:3000/admin";

interface IAdminModel {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
export const AdminService = {
  async getAllUsers(pageNumber = 1, pageSize = 10, token: string) {
    try {
      const response = await axios.get(`${API_URL}/get-all-users`, {
        params: { pageNumber, pageSize },
        headers: { Authorization: token },
      });

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to get all users"
      );
    }
  },
  async getAllArtists(pageNumber = 1, pageSize = 10, token: string) {
    try {
      const response = await axios.get(`${API_URL}/get-all-artists`, {
        params: { pageNumber, pageSize },
        headers: { Authorization: token },
      });

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to get all Artists"
      );
    }
  },

  async deleteUser(userId: string, token: string) {
    try {
      const response = await axios.delete(`${API_URL}/delete-user/${userId}`, {
        headers: { Authorization: token },
      });

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to delete USer");
    }
  },
  async deleteArtist(artistId: string, token: string) {
    try {
      const response = await axios.delete(
        `${API_URL}/delete-user/${artistId}`,
        {
          headers: { Authorization: token },
        }
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to delete Artist"
      );
    }
  },
};
