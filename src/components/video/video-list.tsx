import React from "react";
import {
  Card,
  CardContent,
  CardHeader
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface VideoType {
  id: number;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  dislikes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
  channel: {
    id: number;
    name: string;
    description: string;
    thumbnail: string;
    createdAt: string;
    updatedAt: string;
  };
  category: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  user: {
    id: number;
    name: string;
    email: string;
    avatar: string;
  };
}

interface videoProps {
  video: VideoType;
}

const VideoList: React.FC<videoProps> = ({ video }) => {
  const formatDate = (timestamp: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const formattedDate = new Date(timestamp).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  return (
    <Card className="flex rounded-none p-1 cursor-pointer">
      <CardHeader className="basis-1/4 p-0 relative">
        <img className="h-full w-full object-cover" src={video.thumbnail} />
        <span className="absolute bottom-1 right-1 bg-black text-white p-1 rounded-sm">
          {video.duration.substring(0, 5)}
        </span>
      </CardHeader>
      <CardContent className="basis-2/4 flex flex-col gap-2 pb-0">
        <h5 className="text-2xl font-bold">{video.title}</h5>
        <p className="text-gray-500 text-lg">
          {video.views} views . {formatDate(video.createdAt)}
        </p>
        <div className="flex justify-start items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h6 className="text-xl">{video.channel.name}</h6>
        </div>
        <p>
          {video.description.length > 100
            ? video.description.substring(0, 100) + "..."
            : video.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default VideoList;
