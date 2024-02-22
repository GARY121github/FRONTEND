import React from "react";
import ChannelAvatar from "@/components/Channel/channel-avatar";
import { Link } from "react-router-dom";

interface videoOwner {
  username: string;
  fullName: string;
  _id: string;
  avatar: string;
}

interface VideoCardProps {
  createdAt: string;
  duration: number;
  owner: videoOwner;
  thumbnail: string;
  title: string;
  views: number;
  description: string;
  videoFile: string;
  _id: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  createdAt,
  duration,
  owner,
  thumbnail,
  title,
  views,
  videoFile,
  description,
  _id,
}) => {
  const formattedDuration = secondsToTime(duration);
  const timeDifference = calculateTimeDifference(new Date(createdAt));

  return (
    <div className="flex flex-col gap-1 w-96">
      <div className="relative">
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
          <img
            src={thumbnail}
            className="object-cover h-[14rem] w-96 rounded-md"
            alt="Thumbnail"
          />
          <span className="bg-black text-white text-sm p-1 rounded-md absolute right-1 bottom-1">
            {formattedDuration}
          </span>
        </Link>
      </div>
      <div className="flex gap-2 p-1">
        <ChannelAvatar avatar={owner?.avatar} />
        <div className="flex flex-col justify-around">
          <h3 className="text-white text-xl font-semibold line-clamp-2">
            {title}
          </h3>
          <p className="text-white text-sm">
            {views} views | {timeDifference}
          </p>
          <p className="text-slate-300">{owner?.username}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

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
