import { useEffect, useState } from "react";
import Layout from "@/components/Layout/pages-layout";
import VideoList from "@/components/video/video-list";
import Loading from "@/components/loading";
import { fetchingHistory } from "@/services/videos.service";
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

const WatchHistory = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await fetchingHistory();
      console.log(response);
      setVideos(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistory();
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

export default WatchHistory;
