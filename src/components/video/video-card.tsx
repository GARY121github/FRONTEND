import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
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

const VideoCard: React.FC<videoProps> = ({ video }) => {
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
    <Card className="outline-none flex flex-col gap-0 rounded-md overflow-hidden cursor-pointer bg-red-300">
      <CardHeader className="p-0 relative">
        <img className="h-full w-full object-cover" src={video.thumbnail} />
        <span className="absolute bottom-1 right-1 bg-black text-white p-1 rounded-sm">
          {video.duration.substring(0, 5)}
        </span>
      </CardHeader>
      <CardContent className="flex justify-start items-center gap-2 p-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h6 className="text-xl">{video.title}</h6>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4 pb-2">
        <p>
          {video.views} Views . {formatDate(video.createdAt)}
        </p>
        <h6>{video.user.name}</h6>
      </CardFooter>
    </Card>
  );
};

export default VideoCard;
