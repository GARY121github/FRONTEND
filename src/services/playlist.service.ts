import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const getChannelPlaylist = async (channelId: string) => {
  try {
    const response = await axios.get(`${baseUrl}/playlist/user/${channelId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    return response.data.data;
  } catch (error) {
    throw new Error("Error fetching channel tweets: " + error);
  }
};
