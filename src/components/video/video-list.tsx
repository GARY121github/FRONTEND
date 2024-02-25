import React from "react";
import {
  Card,
  CardContent,
  CardHeader
} from "@/components/ui/card";

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
    <Card className="flex cursor-pointer bg-inherit border-none shadow-none min-w-md">
      <CardHeader className="relative p-0 w-[164px] h-[96px] min-w-[168px] min-h-[94px]">
        <img
          className="object-cover h-full w-full rounded-lg"
          src={video.thumbnail}
          width={168}
          height={94}
        />
        <span className="absolute bottom-1 right-1 bg-black text-white bg-opacity-80 p-0.5 rounded-md">
          {video.duration.substring(0, 5)}
        </span>
      </CardHeader>
      <CardContent className="flex flex-col">
        <h5 className="text-sm font-bold line-clamp-2">{video.title}</h5>
        <p className="text-gray-500 text-xs">
          {video.views} views . {formatDate(video.createdAt)}
        </p>
        <div className="flex justify-start items-center gap-1">
          {/* <Avatar className="">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar> */}
          <h6 className="text-xs">{video.channel.name}</h6>
        </div>
        {/* <p className="line-clamp-2"> */}
        {/* {video.description.length > 100
            ? video.description.substring(0, 100) + "..."
            : video.description} */}
        {/* {video.description}
        </p> */}
      </CardContent>
    </Card>
  );
};

export default VideoList;
