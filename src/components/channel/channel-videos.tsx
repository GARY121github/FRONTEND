import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Empty from "../empty";
import { Play } from "lucide-react";
import VideoCard from "@/components/video/video-card";
import useAuth from "@/hooks/useAuth";

interface videoOwner {
  username: string;
  fullName: string;
  avatar: string;
  _id: string;
}

interface Video {
  createdAt: string;
  description: string;
  duration: number;
  isPublished: boolean;
  owner: videoOwner;
  thumbnail: string;
  title: string;
  updatedAt: string;
  videoFile: string;
  views: number;
  __v: number;
  _id: string;
}

interface ChannelVideosProps {
  channelName: string;
}

const ChannelVideos: React.FC<ChannelVideosProps> = ({ channelName }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchVideos = async () => {
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
        `http://localhost:8000/api/v1/videos/v/${channelName.substring(1)}`,
        {
          headers: {
            Authorization: `Bearer ${storedAccessToken}`,
          },
        }
      );

      setVideos(response.data.data);
      setLoading(false);
    } catch (error) {
      // Handle errors gracefully
      console.error("Error fetching videos:", error);
      // You might want to show a toast message here as well
    }
  };

  useEffect(() => {
    fetchVideos();
    console.log("Videos fetched");
  }, [channelName]);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : videos.length === 0 ? (
        <Empty
          className=""
          icon={<Play className="bg-sky-700 pl-3 p-2 rounded-full" size={50} />}
          title={"No Videos Available"}
          description={
            "There are no videos here available. Please try to search some thing else."
          }
        />
      ) : (
        <div className="grid grid-cols-3 gap-4 p-4">
          {user &&
            videos.map((video) => (
              <VideoCard
                key={video._id}
                title={video.title}
                createdAt={video.createdAt}
                description={video.description}
                duration={video.duration}
                owner={video.owner}
                thumbnail={video.thumbnail}
                videoFile={video.videoFile}
                views={video.views}
                _id={video._id}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default ChannelVideos;
