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
    throw new Error("Error fetching tweets");
  }
};

export const addTweet = async (content: string) => {
  try {
    const response = await axios.post(
      `${baseUrl}/tweets`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error adding tweet");
  }
};

export const deleteTweet = async (tweetId: string) => {
  try {
    const response = await axios.delete(`${baseUrl}/tweets/${tweetId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    return response;
  } catch (error) {
    throw new Error("Error deleting tweet");
  }
};

export const editTweet = async (content: string, tweetId: string) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/tweets/${tweetId}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error editing tweet");
  }
};
