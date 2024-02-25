import { useState, useEffect } from "react";
import Layout from "@/components/Layout/pages-layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import VideoList from "@/components/video/video-list";

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

const Search = () => {
  const { search } = useParams();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);

  const searchVideos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/v1/videos?query=${search}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setVideos(response.data.data.videos);
      setLoading(false);
    } catch (error) {
      console.log("Error while fetching the video -> ", error);
    }
  };

  useEffect(() => {
    searchVideos();
  }, [search]);

  return (
    <Layout>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <div className="flex flex-col gap-1 p-4">
          {videos.length === 0 ? (
            <h1 className="text-2xl text-white">No videos available.</h1>
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

export default Search;
