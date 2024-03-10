import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout/pages-layout";
import axios from "axios";
import VideoCard from "@/components/video/video-card";
import Loading from "@/components/loading";

interface VideoOwner {
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
  owner: VideoOwner;
  thumbnail: string;
  title: string;
  updatedAt: string;
  videoFile: string;
  views: number;
  __v: number;
  _id: string;
}

const Home = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/videos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setVideos(response.data.data.videos);
    } catch (error) {
      setError("Error fetching videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <Layout>
      {loading && <Loading className="" />}
      {error && <p>{error}</p>}
      {!loading && !error && Array.isArray(videos) && videos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {videos.map((video) => (
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
      {!loading &&
        !error &&
        (!Array.isArray(videos) || videos.length === 0) && (
          <p>No videos found.</p>
        )}
    </Layout>
  );
};

export default Home;
