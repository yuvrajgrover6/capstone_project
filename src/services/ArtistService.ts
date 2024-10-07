import axios from "axios";

const API_URL = "http://localhost:3000/auth/artists";

// Fetch all artists
export const fetchArtists = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Return list of artists
  } catch (error) {
    throw new Error("Failed to fetch artists");
  }
};

// Create new artwork
export const createArtwork = async (artworkData: {
  title: string;
  description: string;
  imageUrl: string;
  artistId: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/artworks`, artworkData);
    return response.data; // Return created artwork
  } catch (error) {
    throw new Error("Failed to create artwork");
  }
};
