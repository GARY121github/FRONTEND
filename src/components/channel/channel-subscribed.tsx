import React, { useState, useEffect, memo, useMemo } from "react";
import axios from "axios";
import SubscribedChannelList from './subscribed-channel-list';

interface ChannelSubscribedProps {
  channelId: string | undefined;
}

const ChannelSubscribed: React.FC<ChannelSubscribedProps> = ({ channelId }) => {
  const [data, setData] = useState([]);

  const getSubscribedUsers = useMemo(() => {
    return async () => {
      try {
        const storedAccessToken = localStorage.getItem("accessToken");
        if (!storedAccessToken) {
          console.log("YOU NEED TO LOGIN FIRST");
          return;
        }

        const res = await axios.get(
          `http://localhost:8000/api/v1/subscriptions/c/${channelId}`,
          {
            headers: { Authorization: `Bearer ${storedAccessToken}` },
          }
        );
        console.log(channelId, res);
        setData(res.data.data);
      } catch (error) {
        console.error("Error fetching channel subscribed:", error);
      }
    };
  }, [channelId]);

  useEffect(() => {
    console.log("channel subscribers -> ", channelId);
    if (!channelId) return;

    getSubscribedUsers();
  }, [getSubscribedUsers, channelId]);

  return (
    <div>
      {data.length === 0 ? (
        <div>No Subscribed Channels</div>
      ) : (
        <div className="flex flex-col gap-2">
          {data.map((channel) => (
            <SubscribedChannelList username={channel?.subscribedChannel?.username} avatar={channel?.subscribedChannel?.avatar}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(ChannelSubscribed, (prevProps, nextProps) => {
  return prevProps.channelId === nextProps.channelId;
});
