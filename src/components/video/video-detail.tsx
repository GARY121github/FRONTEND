import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Video from "@/components/video";
import LikeUnlikeButtons from "../like-unlike-button";
import SaveIntoPlaylist from "@/components/save-into-playlist";
import ChannelDetails from "@/components/channel-details";

const VideoDetails = () => {
  const { video } = useLocation().state;

  const [time, setTime] = useState("");

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

  useEffect(() => {
    if (video && video.updatedAt) {
      const givenDate = new Date(video.updatedAt);
      const result = calculateTimeDifference(givenDate);
      setTime(result);
    }
  }, [video]);

  return (
    <div className="flex flex-col gap-2">
      <section>
        <Video
          url={
            "https://res.cloudinary.com/dfw5nnic5/video/upload/v1695117968/Sample_1280x720_mp4_b4db0s.mp4"
          }
        />
      </section>
      <section>
        <Card className="bg-inherit border-black">
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle className="text-2xl">{video.title}</CardTitle>
              <CardDescription className="text-white text-lg">
                {video.views} Views | {time}
              </CardDescription>
            </div>
            <div className="flex justify-between basis-2/6 gap-3">
              <LikeUnlikeButtons like={200} unlike={10} />
              <SaveIntoPlaylist />
            </div>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <ChannelDetails channelName={"falgun"} />
          </CardContent>
          <CardFooter>
            <p>{video.description}</p>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
};

export default VideoDetails;
