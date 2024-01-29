import React from "react";
import useAuth from "@/hooks/useAuth";
import { LogOut } from "lucide-react";
import axios from "axios";

const Logout = () => {
  const { logout } = useAuth();

  const logoutUser = async () => {
    const storedAccessToken = localStorage.getItem("accessToken");
    console.log(localStorage);
    console.log("access Token", storedAccessToken);
    if (!storedAccessToken) {
      console.log("YOU NEED TO LOGIN FIRST");
      return;
    }
    const response = await axios.get("http://localhost:8000/api/v1/users/logout", {
      headers: {
        Authorization: `Bearer ${storedAccessToken}`,
      },
    });

    localStorage.removeItem("accessToken");
    console.log(response);
    logout();
  };

  return (
    <div onClick={logoutUser} className="flex justify-between cursor-pointer w-full">
      Logout <LogOut />
    </div>
  );
};

export default Logout;
