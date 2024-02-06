import React, { useEffect, memo, useMemo, useState } from "react";
import axios from "axios";

interface ChannelVideosProps {
  username: string | undefined;
}

const ChannelVideos: React.FC<ChannelVideosProps> = ({ username }) => {
  const [data, setData] = useState([]);

  const getUsersVideo = useMemo(() => {
    return async () => {
      try {
        const storedAccessToken = localStorage.getItem("accessToken");
        if (!storedAccessToken) {
          console.log("YOU NEED TO LOGIN FIRST");
          return;
        }

        const res = await axios.get(
          `http://localhost:8000/api/v1/videos/v/${username}`,
          {
            headers: { Authorization: `Bearer ${storedAccessToken}` },
          }
        );
        console.log(username, res);
        setData(res.data.data);
      } catch (error) {
        console.error("Error fetching user's videos:", error);
      }
    };
  }, [username]);

  useEffect(() => {
    if (!username) return;

    getUsersVideo();
  }, [getUsersVideo, username]);

  return (
    <div>
      {data.length === 0 ? (
        <div>No videos found</div>
      ) : (
        <div>Videos</div>
      )}
    </div>
  );
};

export default memo(ChannelVideos, (prevProps, nextProps) => {
  return prevProps.username === nextProps.username;
});
