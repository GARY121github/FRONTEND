import React, { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout/pages-layout";
import axios from "axios";
import VideoCard from "@/components/video/video-card";

// Import loading spinner animation CSS
import "./loading-spinner.css";

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
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastVideoRef = useRef<HTMLDivElement | null>(null);

  const fetchVideos = async () => {
    try {
      setLoading(true); // Set loading to true when fetching new data
      const response = await axios.get(
        `http://localhost:8000/api/v1/videos?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const newVideos = response.data.data.videos;
      setVideos((prevVideos) => [...prevVideos, ...newVideos]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(newVideos.length > 0);
    } catch (error) {
      setError("Error fetching videos");
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    if (!hasMore || loading) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchVideos();
        }
      },
      { threshold: 0.1 }
    );

    if (lastVideoRef.current) {
      observer.current.observe(lastVideoRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasMore, loading]);

  return (
    <Layout>
      <div className="grid grid-cols-3 gap-4 p-4">
        {videos.map((video, index) => (
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
            ref={videos.length === index + 1 ? lastVideoRef : null}
          />
        ))}
      </div>
      
      {!hasMore && (
        <div className="flex justify-center items-center h-20">
          <h1 className="text-3xl font-semibold">No more videos to load</h1>
        </div>
      )}

      {loading && (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
      )}
      {error && <p>{error}</p>}
    </Layout>
  );
};

export default Home;
