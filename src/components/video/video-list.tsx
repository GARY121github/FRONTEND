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
  className?: string;
  component?: string;
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
  className = "",
  component = "",
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
      <div
        className={`flex gap-4 p-1 w-full h-full ${className} ${
          component !== "recommendation" ? "h-[14rem]" : "h-[8rem]"
        }`}
      >
        <div
          className={`relative w-full h-full ${
            component !== "recommendation" ? "basis-[33%] " : "basis-[45%] "
          }`}
        >
          <img
            className={`rounded-xl object-cover h-full w-full ${
              component !== "recommendation"
                ? "max-h-[14rem] max-w-96"
                : "max-h-[8rem] max-w-40"
            }`}
            src={thumbnail}
          />
          <span
            className={`bg-black text-white  p-1 rounded-md absolute right-1 bottom-1 ${
              component !== "recommendation" ? "text-sm" : "text-xs"
            }`}
          >
            {formattedDuration}
          </span>
        </div>
        <div
          className={`flex flex-col flex-wrap ${
            component !== "recommendation"
              ? "basis-[67%] gap-3 my-2"
              : "basis-[55%] gap-1"
          }`}
        >
          <h1
            className={`text-white font-bold ${
              component !== "recommendation"
                ? "text-3xl"
                : "text-sm line-clamp-1"
            }`}
          >
            {title}
          </h1>
          <p
            className={`text-slate-300 ${
              component !== "recommendation" ? "text-xl" : "text-xs"
            }`}
          >
            {views} views | {timeDifference}
          </p>
          <Link to={`/@${owner?.username}`}>
            <div className="flex gap-2 items-center mt-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="p-0">
                    <ChannelAvatar
                      avatar={owner?.avatar}
                      className={`${
                        component !== "recommendation"
                          ? "h-10 w-10 text-md"
                          : "h-5 w-5 text-xs"
                      }`}
                    />
                  </TooltipTrigger>
                  <TooltipContent className="bg-black border-none text-white">
                    //TODO: Add owner info in recommended videos
                    <span>{owner?.username}</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span
                className={`text-white ${
                  component !== "recommendation" ? "text-2xl" : "text-xs"
                }`}
              >
                {owner?.fullName}
              </span>
            </div>
          </Link>
          <p
            className={`text-slate-300 ${
              component !== "recommendation"
                ? "line-clamp-3 text-lg"
                : "line-clamp-2 text-xs"
            } `}
          >
            {description}
          </p>
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
