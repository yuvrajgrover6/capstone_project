import axios from "axios";

const API_URL = "http://localhost:3000/donation";

// Fund an artwork
export const fundArtwork = async (fundData: {
  artworkId: string;
  funderId: string;
  amount: number;
}) => {
  try {
    const response = await axios.post(`${API_URL}/fund`, fundData);
    return response.data; // Return funding receipt or confirmation
  } catch (error) {
    throw new Error("Failed to fund artwork");
  }
};
