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

export const createPlaylist = async (
  name: string,
  description: string,
  thumbnail: File
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("thumbnail", thumbnail);
  try {
    const response = await axios.post(`${baseUrl}/playlist`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response);
  } catch (error) {
    throw new Error("Error creating playlist: " + error);
  }
};

export const saveVideoIntoPlaylist = async (
  videoId: string,
  playlistId: string
) => {
  try {
    const response = await axios.put(
      `${baseUrl}/playlist/add/${videoId}/${playlistId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error saving video into playlist: " + error);
  }
};
