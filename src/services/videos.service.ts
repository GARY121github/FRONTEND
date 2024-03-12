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

export const togglePublishingOfVideo = async (videoId: string) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/videos/toggle/publish/${videoId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteVideo = async (videoId: string) => {
  try {
    const response = await axios.delete(`${baseUrl}/videos/${videoId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const editVideo = async (
  videoId: string,
  thumbnail: File,
  title: string,
  description: string
) => {
  try {
    const data = new FormData();
    data.append("thumbnail", thumbnail);
    data.append("title", title);
    data.append("description", description);
    await axios.patch(`${baseUrl}/videos/${videoId}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  } catch (error) {
    throw new Error("Error updating video: " + error);
  }
};


export const uploadVideo = async (
  videoFile: File,
  thumbnail: File,
  title: string,
  description: string
) => {
  try {
    const data = new FormData();
    data.append("videoFile", videoFile);
    data.append("thumbnail", thumbnail);
    data.append("title", title);
    data.append("description", description);
    await axios.post(`${baseUrl}/videos`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  } catch (error) {
    throw new Error("Error uploading video: " + error);
  }
};

export const incrementViewCount = async (videoId: string) => {
  try {
    await axios.get(`${baseUrl}/videos/${videoId}/view`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  } catch (error) {
    throw new Error("Error increasing view count: " + error);
  }
};
