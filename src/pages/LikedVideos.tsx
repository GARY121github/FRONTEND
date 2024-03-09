import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout/pages-layout";
import axios from "axios";
import VideoList from "@/components/video/video-list";
import Loading from "@/components/loading";

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

const LikedVideos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLikedVideos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8000/api/v1/likes/videos",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setVideos(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLikedVideos();
  }, []);
  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-1 p-4">
          {videos.length === 0 ? (
            <div className="flex justify-center items-center h-screen">
              <h1 className="text-3xl text-white font-bold">
                You have not liked any video yet
              </h1>
            </div>
          ) : (
            videos.map((video) => (
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
              />
            ))
          )}
        </div>
      )}
    </Layout>
  );
};

export default LikedVideos;
