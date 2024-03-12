import { useState, useEffect } from "react";
import Layout from "@/components/Layout/pages-layout";
import { useParams } from "react-router-dom";
import VideoList from "@/components/video/video-list";
import ChannelList from "@/components/Channel/channel-list";
import { searchingChannel, searchingVideos } from "@/services/search.service";

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

interface ChannelDetails {
  _id: string;
  username: string;
  fullName: string;
  avatar: string;
  coverImage: string;
  subscribersCount: number;
  channelsSubscriberToCount: number;
  isSubscribed: boolean;
}

const Search = () => {
  const { search } = useParams();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [channel, setChannel] = useState<ChannelDetails | null>(null);

  const searchChannel = async () => {
    try {
      const response = await searchingChannel(search);
      setChannel(response);
    } catch (error) {
      setChannel(null);
    }
  };

  const searchVideos = async () => {
    try {
      setLoading(true);
      const response = await searchingVideos(search);
      setVideos(response.videos);
      setLoading(false);
    } catch (error) {
      console.log("Error while fetching the video -> ", error);
    }
  };

  useEffect(() => {
    searchChannel();
    searchVideos();
  }, [search]);

  return (
    <Layout>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <div className="flex flex-col gap-1 p-4">
          {channel && (
            <div className="p-4 border-b-2 border-white">
              <ChannelList
                avatar={channel.avatar}
                fullName={channel.fullName}
                subscribersCount={channel.subscribersCount}
                username={channel.username}
              />
            </div>
          )}
          {videos.length === 0 ? (
            <div className="flex justify-center items-center h-screen">
              <h1 className="text-3xl text-white font-bold">No Videos Found</h1>
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

export default Search;
