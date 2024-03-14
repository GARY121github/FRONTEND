import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const getVideoComments = async (videoId: string) => {
  try {
    const response = await axios.get(`${baseUrl}/comments/${videoId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error("Error fetching comments");
  }
};

export const addComment = async (videoId: string, content: string) => {
  try {
    const response = await axios.post(
      `${baseUrl}/comments/${videoId}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error adding comment");
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const response = await axios.delete(`${baseUrl}/comments/c/${commentId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    return response;
  } catch (error) {
    throw new Error("Error deleting comment");
  }
};

export const editComment = async (content: string, commentId: string) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/comments/c/${commentId}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error editing comment");
  }
};
