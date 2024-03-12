import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

// login service
export const loginUser = async (
  username: string,
  password: string,
  email: string
) => {
  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    const response = await axios.post(`${baseUrl}/users/login`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to login");
  }
};

// register service
interface RegisterUserData {
  username: string;
  email: string;
  fullName: string;
  password: string;
  avatar?: File;
  coverImage?: File;
}

export const registerUser = async (values: RegisterUserData) => {
  try {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("fullName", values.fullName);
    formData.append("password", values.password);
    values.avatar?.name && formData.append("avatar", values.avatar!);
    values.coverImage?.name &&
      formData.append("coverImage", values.coverImage!);

    const response = await axios.post(`${baseUrl}/users/register`, formData);
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to register user");
  }
};

// logout service
export const logoutUser = async () => {
  try {
    const response = await axios.get(`${baseUrl}/users/logout`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response;
  } catch (error) {
    throw new Error("Failed to logout user");
  }
};

// get users channel service
export const getUsersChannel = async (username: string) => {
  try {
    const response = await axios.get(`${baseUrl}/users/c/${username}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch channel details");
  }
};
