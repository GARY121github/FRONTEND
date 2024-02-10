import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import ChannelAvatar from "./channel-avatar";

interface SubscribedChannel {
  _id: string;
  fullName: string;
  username: string;
  avatar: string;
  coverImage: string;
  email: string;
}

interface SubscribedChannelWithUsername extends SubscribedChannel {
  username: string;
}

interface SubscribedChannelsProps {
  channelId: string;
}

const SubscribedChannels: React.FC<SubscribedChannelsProps> = ({
  channelId,
}) => {
  const [channels, setChannels] = useState<SubscribedChannelWithUsername[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchSubscribedChannels = async () => {
    try {
      const storedAccessToken = localStorage.getItem("accessToken");
      if (!storedAccessToken) {
        // If there's no stored access token, show a toast message and navigate to the login page
        toast({
          variant: "destructive",
          title: "Unauthorized",
          description: "You need to log in first to access this page.",
        });
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `http://localhost:8000/api/v1/subscriptions/c/${channelId}`,
        {
          headers: {
            Authorization: `Bearer ${storedAccessToken}`,
          },
        }
      );

      // Update state with fetched subscribed channels
      console.log(response);
      setChannels(response.data.data);
      setLoading(false);
    } catch (error) {
      // Handle errors gracefully
      console.error("Error fetching subscribed channels:", error);
      // You might want to show a toast message here as well
    }
  };

  useEffect(() => {
    fetchSubscribedChannels();
  }, [channelId]); // Trigger the effect when channelId changes

  return (
    <>
      {loading ? (
        // Render loading state if data is being fetched
        <div>Loading...</div>
      ) : channels.length === 0 ? (
        // Render message when no subscribed channels available
        <div>No Subscribed Channels Available</div>
      ) : (
        <div className="p-2 ">
          <ul className="flex flex-col gap-2">
            {channels.map((channel) => (
              <li key={channel._id} className="bg-slate-300">
                <div className="flex justify-between p-2">
                  <div className="flex gap-2 items-center">
                    <ChannelAvatar
                      className="h-14 w-14"
                      avatar={channel.avatar}
                    />
                    <h3 className="text-xl">@{channel.username}</h3>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SubscribedChannels;
