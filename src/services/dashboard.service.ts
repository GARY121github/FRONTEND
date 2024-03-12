import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const getChannelsDashboardVideos = async () => {
  try {
    console.log(baseUrl);
    const response = await axios.get(`${baseUrl}/dashboard/videos`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response);
    return response.data.data.videos;
  } catch (error) {
    console.log(error);
  }
};
