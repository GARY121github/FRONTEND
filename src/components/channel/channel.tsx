import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CoverImage from "./cover-image";
import ProfileImage from "./profile-image";
import { Button } from "@/components/ui/button";
import { BellPlus, BellMinus } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import ChannelPlaylist from "./channel-playlist";
import ChannelSubscribed from "./channel-subscribed";
import ChannelTweets from "./channel-tweets";
import ChannelVideos from "./channel-videos";

interface ChannelDetails {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  coverImage: string;
  subscribersCount: number;
  channelsSubscriberToCount: number;
  isSubscribed: boolean;
}

const Channel: React.FC = () => {
  const { channelName } = useParams();
  const [channel, setChannel] = useState<ChannelDetails | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { user } = useAuth();
  const [selectedComponent, setSelectedComponent] = useState<React.ReactNode>();

  const channelItems = useMemo(
    () => [
      {
        title: "Videos",
        component: <ChannelVideos username={channelName} />,
      },
      {
        title: "Playlist",
        component: <ChannelPlaylist channelId={channel?._id} />,
      },
      {
        title: "Tweets",
        component: <ChannelTweets channelId={channel?._id} />,
      },
      {
        title: "Subscribed",
        component: <ChannelSubscribed channelId={channel?._id} />,
      },
    ],
    [channelName]
  );

  const getChannelDetails = async () => {
    try {
      const storedAccessToken = localStorage.getItem("accessToken");
      if (!storedAccessToken) {
        console.log("YOU NEED TO LOGIN FIRST");
        return;
      }

      const response = await axios.get(
        `http://localhost:8000/api/v1/users/c/${channelName}`,
        {
          headers: { Authorization: `Bearer ${storedAccessToken}` },
        }
      );
      setChannel(response.data.data);
      setIsSubscribed(response.data.data.isSubscribed);
      setSelectedComponent(channelItems[0].component);
    } catch (error) {
      console.error("Error fetching channel details:", error);
    }
  };

  const toggleSubscription = async () => {
    try {
      const storedAccessToken = localStorage.getItem("accessToken");
      if (!storedAccessToken) {
        console.log("YOU NEED TO LOGIN FIRST");
        return;
      }

      const response = await axios.post(
        `http://localhost:8000/api/v1/subscriptions/c/${channel?._id}`,
        {},
        { headers: { Authorization: `Bearer ${storedAccessToken}` } }
      );
      setIsSubscribed((prev) => !prev);
      handleChannelItemsChanges(0);
      console.log(response);
    } catch (error) {
      console.error("Error toggling subscription:", error);
    }
  };

  const handleChannelItemsChanges = (index: number) => {
    setSelectedComponent(channelItems[index].component);
  };

  useEffect(() => {
    getChannelDetails();
  }, [channelName, isSubscribed]);

  return (
    <div className="flex flex-col gap-2">
      <section>
        <div className="relative">
          <CoverImage edit={false} coverImage={channel?.coverImage} />
          <div className=" absolute -bottom-14 left-4">
            <ProfileImage edit={false} avatar={channel?.avatar} />
          </div>
        </div>
        <div className="flex justify-between ml-32 p-3 items-center">
          <div>
            <h3 className="text-white text-xl">{channel?.fullName}</h3>
            <p className="text-slate-200">
              @{channel?.username} | {channel?.subscribersCount} subscribers |{" "}
              {channel?.channelsSubscriberToCount} subscribed
            </p>
          </div>
          {user?.username !== channel?.username && (
            <div onClick={toggleSubscription}>
              {isSubscribed ? (
                <Button className="bg-green-600 hover:bg-green-500">
                  <BellMinus /> &nbsp; &nbsp; Subscribed
                </Button>
              ) : (
                <Button className="bg-red-600 hover:bg-red-700">
                  <BellPlus /> &nbsp; &nbsp; Subscribe
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
      <section className="p-2">
        <div className="flex justify-around border-b-2">
          {channelItems.map((item, index) => (
            <div
              key={index}
              className={`text-center p-2 ${
                selectedComponent === item.component
                  ? "bg-white"
                  : "hover:bg-slate-400"
              } basic-1/4 w-full cursor-pointer`}
              onClick={() => handleChannelItemsChanges(index)}
            >
              <h3 className="text-xl">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>
      <section className="selected-component-wrapper p-4">
        {selectedComponent}
      </section>
    </div>
  );
};

export default Channel;
