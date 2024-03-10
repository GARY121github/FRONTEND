import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

// login service
export const loginService = async (
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
export const registerUserService = async (values: RegisterUserData) => {
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
