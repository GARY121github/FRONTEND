import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SubscribedChannelListProps {
  username: string;
  avatar: string;
}

const SubscribedChannelList: React.FC<SubscribedChannelListProps> = ({
  username,
  avatar,
}) => {
  return (
    <div className="flex items-center gap-2 justify-between bg-slate-300 p-2">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h3 className="text-2xl">{username}</h3>
      </div>
    </div>
  );
};

export default SubscribedChannelList;
