import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface props {
  avatar: string | undefined;
  edit: boolean;
}

const ProfileImage: React.FC<props> = ({ avatar, edit }) => {
  return (
    <>
      <Avatar className="min-h-28 min-w-28">
        <AvatarImage src={avatar} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {edit ? <h1>Edit</h1> : null}
    </>
  );
};

export default ProfileImage;
