import { getVideoRecommendations } from "@/services/videos.service";
import React, { useEffect, useState } from "react";
import VideoList from "./video-list";

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

const VideoRecommendations = () => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([]);

  const fetchRecommendedVideos = async () => {
    try {
      setLoading(true);
      const response = await getVideoRecommendations();
      console.log(response);
      setVideos(response);
    } catch (error) {
      console.log("Error fetching recommended videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendedVideos();
  }, []);

  return (
    <div className="video-recommendations">
      <h2 className="text-white text-center bg-blue-950 p-2 rounded-lg mb-4">
        Recommended Videos
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : videos?.length === 0 ? (
        <p className="text-white">No videos to recommend</p>
      ) : (
        <div className="flex flex-col gap-4">
          {videos?.map((video) => (
            <VideoList
              key={video._id}
              createdAt={video.createdAt}
              description={video.description}
              duration={video.duration}
              isPublished={video.isPublished}
              owner={video.owner}
              thumbnail={video.thumbnail}
              title={video.title}
              updatedAt={video.updatedAt}
              videoFile={video.videoFile}
              views={video.views}
              __v={video.__v}
              _id={video._id}
              className="grid-cols-2"
              component="recommendation"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoRecommendations;
