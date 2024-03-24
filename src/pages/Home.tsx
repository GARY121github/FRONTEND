import { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout/pages-layout";
import VideoCard from "@/components/video/video-card";
import Loading from "@/components/loading";
import { getVideos } from "@/services/videos.service.ts";
import VideoEmpty from "@/components/video/video-empty";

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
  const [fetchMoreVideos, setFetchMoreVideos] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastVideoRef = useRef<HTMLDivElement | null>(null);

  const fetchVideos = async () => {
    if (!hasMore) return; // No need to fetch more if there are no more videos
    setFetchMoreVideos(true);
    try {
      const newVideos = await getVideos(page);
      setVideos((prevVideos) => [...prevVideos, ...newVideos]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(newVideos.length > 0);
    } catch (error) {
      setError("Error fetching videos");
    } finally {
      setFetchMoreVideos(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
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
      { threshold: 0.5 } // Adjust threshold value
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

  if (loading && videos.length === 0) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout>
      {error && <p>{error}</p>}
      {videos.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-4 sm:p-4">
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
          {fetchMoreVideos && hasMore && <Loading />}
        </>
      )}
      {!fetchMoreVideos &&
        !error &&
        (!Array.isArray(videos) || videos.length === 0) && <VideoEmpty />}
    </Layout>
  );
};

export default Home;
