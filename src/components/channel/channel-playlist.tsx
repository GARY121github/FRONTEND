import React, { useState, useEffect, memo, useMemo } from "react";
import axios from "axios";

interface ChannelPlaylistProps {
  channelId: string | undefined;
}

const ChannelPlaylist: React.FC<ChannelPlaylistProps> = ({ channelId }) => {
  const [data, setData] = useState([]);

  const getChannelPlaylist = useMemo(() => {
    return async () => {
      try {
        const storedAccessToken = localStorage.getItem("accessToken");
        if (!storedAccessToken) {
          console.log("YOU NEED TO LOGIN FIRST");
          return;
        }

        const res = await axios.get(
          `http://localhost:8000/api/v1/playlist/user/${channelId}`,
          {
            headers: { Authorization: `Bearer ${storedAccessToken}` },
          }
        );
        console.log(channelId, res);
        setData(res.data.data);
      } catch (error) {
        console.error("Error fetching user's videos:", error);
      }
    };
  }, [channelId]);

  useEffect(() => {
    console.log("channel playlist -> " , channelId);
    if (!channelId) return;

    getChannelPlaylist();
  }, [getChannelPlaylist, channelId]);

  return (
    <div>
      {data.length === 0 ? <div>No playlist found</div> : <div>Playlist</div>}
    </div>
  );
};

export default memo(ChannelPlaylist, (prevProps, nextProps) => {
  return prevProps.channelId === nextProps.channelId;
});
