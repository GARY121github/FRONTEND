import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import axios from "axios";
import useAuth from "@/hooks/useAuth";

const search: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const search = useRef<HTMLInputElement | null>(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useAuth();

  const onSearch = async () => {
    if (
      search.current?.value.trim().length === 0 ||
      search.current?.value === null
    )
      return;

    console.log(search.current?.value);

    const storedAccessToken = localStorage.getItem("accessToken");
    console.log(localStorage);
    console.log("access Token" , storedAccessToken);
    if (!storedAccessToken) {
      console.log("YOU NEED TO LOGIN FIRST");
      return;
    }

    console.log(user);
    const response = await axios.get(
      `http://localhost:8000/api/v1/users/c/${search.current?.value}`,
      {
        headers: {
          Authorization: `Bearer ${storedAccessToken}`,
        },
      }
    );
    console.log(response);
  };

  return (
    <div className="flex justify-around items-center border rounded-lg p-1">
      <Input
        className="border-none outline-none focus-visible:ring-0 shadow-none"
        type="text"
        placeholder="search"
        ref={search}
      />
      <Button className="bg-blue-300 hover:bg-blue-400" onClick={onSearch}>
        <Search className="cursor-pointer" />
      </Button>
    </div>
  );
};

export default search;
