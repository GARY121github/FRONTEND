import React from "react";
import ChannelAvatar from "./channel-avatar";
import { Link } from "react-router-dom";

interface channelDetails {
  username: string;
  fullName: string;
  avatar: string;
  subscribersCount: number;
  className?: string;
}
const ChannelList: React.FC<channelDetails> = ({
  username,
  fullName,
  avatar,
  subscribersCount,
  className = "",
}) => {
  return (
    <Link to={`/@${username}`}>
      <div className={`grid grid-cols-3 gap-4 p-1 ${className}`}>
        <div className="col-span-1 cursor-pointer">
          <ChannelAvatar avatar={avatar} className="w-36 h-36 mx-auto" />
        </div>
        <div className="col-span-2 flex flex-col justify-center gap-2">
          <h2 className="text-white text-2xl">{fullName}</h2>
          <h1 className="text-slate-200 text-xl">@{username}</h1>
          <h2 className="text-slate-200 text-lg">
            {subscribersCount} Subscribers
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default ChannelList;
