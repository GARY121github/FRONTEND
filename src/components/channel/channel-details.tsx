import React, { useEffect, useState } from "react";
import ChannelAvatar from "@/components/Channel/channel-avatar";
import { Button } from "@/components/ui/button";
import { BellPlus, BellMinus } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { getUsersChannel } from "@/services/user.service.ts";
import { toggleSubscription } from "@/services/subscription.service.ts";

interface props {
  channelName: string;
}

interface channelDetails {
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

const ChannelDetails: React.FC<props> = ({ channelName }) => {
  const [channel, setChannel] = useState<channelDetails>();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { user } = useAuth();

  const getChannelDetails = async () => {
    const response = await getUsersChannel(channelName);
    setChannel(response);
    return response.isSubscribed;
  };

  const toggelSubscriptionHandler = async () => {
    await toggleSubscription(channel!._id);
    setIsSubscribed((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      const subscription = await getChannelDetails();
      setIsSubscribed(subscription);
    };
    fetchData();
  }, [isSubscribed]);

  return (
    <div className="flex justify-between items-center w-full border-b-2 pb-4">
      {channel && (
        <Link to={`/@${channel.username}`} className="flex gap-1 items-center">
          <section className="flex justify-around gap-2 items-center">
            <ChannelAvatar avatar={channel.avatar} />
            <div className="flex flex-col justify-between items-start">
              <h3 className="md text-white">{channel?.username}</h3>
              <p className="text-slate-400">
                {channel?.subscribersCount} Subscribers
              </p>
            </div>
          </section>
        </Link>
      )}
      {user && user.username !== channelName ? (
        <section onClick={toggelSubscriptionHandler}>
          {isSubscribed ? (
            <Button className="bg-green-600 hover:bg-green-500">
              <BellMinus />
            </Button>
          ) : (
            <Button className="bg-red-600 hover:bg-red-700">
              <BellPlus />
            </Button>
          )}
        </section>
      ) : null}
    </div>
  );
};

export default ChannelDetails;
