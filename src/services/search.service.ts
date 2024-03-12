import axios from "axios";

const baseUrl = "http://localhost:8000/api/v1";

export const searchingChannel = async (search: string | undefined) => {
  try {
    const response = await axios.get(`${baseUrl}/users/c/${search}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error("Error while fetching the playlist -> " + error);
  }
};

export const searchingVideos = async (search: string | undefined) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/v1/videos?query=${search}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error while fetching the video -> " + error);
  }
};
