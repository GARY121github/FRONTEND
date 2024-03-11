import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const getChannelsDashboardVideos = async () => {
  try {
    const response = await axios.get(`${baseUrl}/dashboard/videos`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data.data.videos;
  } catch (error) {
    console.log(error);
  }
};
