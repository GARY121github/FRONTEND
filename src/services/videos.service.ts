import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const getVideos = async (page: number) => {
  try {
    const response = await axios.get(`${baseUrl}/videos?page=${page}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data.data.videos;
  } catch (error) {
    throw new Error("Failed to fetch videos");
  }
};

export const getChannelVideos = async (channelName: string) => {
  try {
    const response = await axios.get(`${baseUrl}/videos/v/${channelName}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
