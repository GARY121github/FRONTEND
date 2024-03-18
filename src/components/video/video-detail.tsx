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
import Like from "../like";
import SaveIntoPlaylist from "@/components/Playlist/save-into-playlist";
import ChannelDetails from "@/components/Channel/channel-details";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import VideoComments from "./video-comments";

const VideoDetails = () => {
  const { video } = useLocation().state;
  const [timeDifference, setTimeDifference] = useState<string>("");
  const { user } = useAuth();

  const increaseViewCount = async () => {
    try {
      await axios.get(`http://localhost:8000/api/v1/videos/${video._id}/view`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    increaseViewCount();
    setTimeDifference(calculateTimeDifference(new Date(video.createdAt)));
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <section>
        <Video url={video.videoFile} />
      </section>
      <section>
        <Card className="bg-slate-800 border-black">
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle className="text-2xl text-white font-bold">
                {video.title.toUpperCase()}
              </CardTitle>
              <CardDescription className="text-white text-sm">
                {video.views} views | {timeDifference}
              </CardDescription>
            </div>
            <div className="flex justify-around gap-1">
              <Like likeOf="video" id={video._id} />
              {user && video.owner._id === user._id && (
                <SaveIntoPlaylist videoId={video._id} />
              )}
            </div>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <ChannelDetails channelName={video.owner.username} />
          </CardContent>
          <CardFooter>
            <p className="text-white">{video.description}</p>
          </CardFooter>
        </Card>
      </section>
      <section>
        <VideoComments videoId={video._id} />
      </section>
    </div>
  );
};

export default VideoDetails;

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
