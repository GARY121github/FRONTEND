import React, { useState, useEffect, memo, useMemo } from "react";
import axios from "axios";

interface ChannelTweetsProps {
  channelId: string | undefined
}

const ChannelTweets:React.FC<ChannelTweetsProps> = ({channelId}) => {
  const [data, setData] = useState([]);

  const getChannelTweets = useMemo(() => {
    return async () => {
      try {
        const storedAccessToken = localStorage.getItem("accessToken");
        if (!storedAccessToken) {
          console.log("YOU NEED TO LOGIN FIRST");
          return;
        }

        const res = await axios.get(
          `http://localhost:8000/api/v1/tweets/user/${channelId}`,
          {
            headers: { Authorization: `Bearer ${storedAccessToken}` },
          }
        );
        console.log(channelId, res);
        setData(res.data.data);
      } catch (error) {
        console.error("Error fetching channel tweet:", error);
      }
    };
  }, [channelId]);

  useEffect(() => {
    if (!channelId) return;

    getChannelTweets();
  }, [getChannelTweets, channelId]);

  return (
    <div>
      {data.length === 0 ? <div>No tweets found</div> : <div>Tweets</div>}
    </div>
  );
};

export default memo(ChannelTweets, (prevProps, nextProps) => {
  return prevProps.channelId === nextProps.channelId;
});
