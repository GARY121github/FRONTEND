import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const getChannelTweet = async (channelId: string) => {
  try {
    const response = await axios.get(`${baseUrl}/tweets/user/${channelId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
