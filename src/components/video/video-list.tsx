import React from "react";
import ChannelAvatar from "../Channel/channel-avatar";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface videoOwner {
  username: string;
  fullName: string;
  avatar: string;
  _id: string;
}

interface VideoListProps {
  createdAt: string;
  description: string;
  duration: number;
  isPublished: boolean;
  owner: videoOwner;
  thumbnail: string;
  title: string;
  updatedAt: string;
  videoFile: string;
  views: number;
  __v: number;
  _id: string;
}

const VideoList: React.FC<VideoListProps> = ({
  createdAt,
  description,
  duration,
  owner,
  thumbnail,
  title,
  videoFile,
  views,
  _id,
}) => {
  const formattedDuration = secondsToTime(duration);
  const timeDifference = calculateTimeDifference(new Date(createdAt));
  return (
    <Link
      to={`/video/${_id}`}
      state={{
        video: {
          videoFile,
          views,
          title,
          duration,
          createdAt,
          description,
          owner,
          _id,
        },
      }}
    >
      <div className="grid grid-cols-3 gap-4 p-1">
        <div className="col-span-1 relative">
          <img
            className="rounded-xl object-cover h-60 w-full"
            src={thumbnail}
          />
          <span className="bg-black text-white text-sm p-1 rounded-md absolute right-1 bottom-1">
            {formattedDuration}
          </span>
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <h1 className="text-white text-2xl font-bold">{title}</h1>
          <p className="text-slate-300 text-sm">
            {views} views | {timeDifference}
          </p>
          <Link to={`/@${owner?.username}`}>
            <div className="flex gap-1 items-center mt-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="p-0">
                    <ChannelAvatar avatar={owner?.avatar} />
                  </TooltipTrigger>
                  <TooltipContent className="bg-black border-none text-white">
                    <span>{owner?.username}</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className="text-white text-lg">{owner?.fullName}</span>
            </div>
          </Link>
          <p className="text-slate-300 text-md line-clamp-3">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default VideoList;

function secondsToTime(duration: number): string {
  const hours: number = Math.floor(duration / 3600);
  const minutes: number = Math.floor((duration % 3600) / 60);
  const seconds: number = Math.floor(duration % 60);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function calculateTimeDifference(givenDate: Date): string {
  const currentDate = new Date();
  const timeDifferenceInMilliseconds =
    currentDate.getTime() - givenDate.getTime();
  const seconds = Math.floor(timeDifferenceInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const getTimeAgo = (value: number, unit: string): string =>
    value > 0 ? `${value} ${unit}${value === 1 ? "" : "s"} ago` : "";

  return (
    getTimeAgo(years, "year") ||
    getTimeAgo(months, "month") ||
    getTimeAgo(weeks, "week") ||
    getTimeAgo(days, "day") ||
    getTimeAgo(hours, "hour") ||
    getTimeAgo(minutes, "minute") ||
    getTimeAgo(seconds, "second")
  );
}
