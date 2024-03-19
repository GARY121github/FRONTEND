import React, { useEffect, useState } from "react";
import Empty from "../empty";
import { Play } from "lucide-react";
import VideoCard from "@/components/video/video-card";
import useAuth from "@/hooks/useAuth";
import Loading from "../loading";
import { getChannelVideos } from "@/services/videos.service.ts";

interface Video {
  createdAt: string;
  description: string;
  duration: number;
  owner: {
    username: string;
    fullName: string;
    avatar: string;
    _id: string;
  };
  thumbnail: string;
  title: string;
  videoFile: string;
  views: number;
  _id: string;
}

interface ChannelVideosProps {
  channelName: string;
}

const ChannelVideos: React.FC<ChannelVideosProps> = ({ channelName }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await getChannelVideos(channelName.substring(1));
        setVideos(response);
      } catch (error) {
        console.error("Error fetching videos:", error);
        // You might want to show a toast message here as well
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
    console.log("Videos fetched");
  }, [channelName]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : videos.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-3 gap-4 p-4">
          {user &&
            videos.map((video) => (
              <VideoCard key={video._id} {...video} />
            ))}
        </div>
      )}
    </div>
  );
};

const EmptyState: React.FC = () => (
  <Empty
    className=""
    icon={<Play className="bg-sky-700 pl-3 p-2 rounded-full" size={50} />}
    title={"No Videos Available"}
    description={"There are no videos available. Please try searching for something else."}
  />
);

export default ChannelVideos;
