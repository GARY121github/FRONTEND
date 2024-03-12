import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const toggleSubscription = async (channelId: string) => {
  try {
    const response = await axios.post(
      `${baseUrl}/subscriptions/c/${channelId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getSubscribedChannels = async (channelId: string) => {
  try {
    const response = await axios.get(
      `${baseUrl}/subscriptions/c/${channelId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw new Error("Error fetching subscribed channels: " + error);
  }
};

export const fetchingSubscribers = async (userId: string) => {
  try {
    const response = await axios.get(`${baseUrl}/subscriptions/u/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error("Error fetching subscribers: " + error);
  }
};
