import { useEffect, useState } from "react";
import Layout from "@/components/Layout/pages-layout";
import VideoList from "@/components/video/video-list";
import ChannelAvatar from "@/components/Channel/channel-avatar";
import { useParams, Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { fetchingPlaylist } from "@/services/playlist.service";

interface Owner {
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
  thumbnail: string;
  title: string;
  updatedAt: string;
  videoFile: string;
  views: number;
  __v: number;
  _id: string;
}

interface Playlist {
  createdAt: string; // Date and time when the collection was created
  description: string; // Description of the video collection
  name: string; // Name of the video collection
  owner: Owner; // ID of the owner of the video collection
  thumbnail: string; // URL of the thumbnail image for the video collection
  updatedAt: string; // Date and time when the collection was last updated
  videos: Video[]; // Array of IDs of videos in the collection
  __v: number; // Version number or any other version-related data
  _id: string; // Unique identifier for the video collection
}

const Playlist = () => {
  const { playlist } = useParams();
  const [Playlist, setPlaylist] = useState<Playlist>();
  const [Videos, setVideos] = useState<Array<Video>>();
  const fetchPlaylist = async () => {
    try {
      const response = await fetchingPlaylist(playlist);
      setPlaylist(response);
      setVideos(response.videos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, [playlist]);
  return (
    <Layout>
      {Playlist ? (
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <div className="flex flex-wrap gap-x-4 gap-y-10 p-4 xl:flex-nowrap">
            <div className="w-full shrink-0 sm:max-w-md xl:max-w-sm">
              <div className="relative mb-2 w-full pt-[56%] mt-2">
                <div className="absolute inset-0">
                  <img
                    src={Playlist.thumbnail}
                    alt="React Mastery"
                    className="h-full w-full"
                  />
                  <div className="absolute inset-x-0 bottom-0">
                    <div className="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
                      <div className="relative z-[1]">
                        <p className="flex justify-between">
                          <span className="inline-block">Playlist</span>
                          <span className="inline-block">
                            {Playlist?.videos?.length} videos
                          </span>
                        </p>
                        <p className="text-sm text-gray-200">
                          100K Views |{" "}
                          {Playlist &&
                            calculateTimeDifference(
                              new Date(Playlist.createdAt)
                            )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h6 className="mb-1 font-semibold text-white text-xl">
                {Playlist.name}
              </h6>
              <p className="flex text-sm text-gray-200">
                {Playlist.description}
              </p>
              <Link to={`/@${Playlist.owner.username}`}>
                <div className="mt-6 flex items-center gap-x-3">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="p-0">
                        <ChannelAvatar avatar={Playlist.owner.avatar} />
                      </TooltipTrigger>
                      <TooltipContent className="bg-black border-none text-white">
                        <span>{Playlist.owner.fullName}</span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <span className="text-white text-lg">
                    {Playlist.owner.username}
                  </span>
                </div>
              </Link>
            </div>
            <div className="flex w-full flex-col gap-y-4">
              {Videos &&
                (Videos.length === 0 ? (
                  <div className="flex justify-center items-center h-screen">
                    <h1 className="text-3xl">No Videos Available</h1>
                  </div>
                ) : (
                  Videos.map((video) => (
                    <VideoList
                      key={video._id}
                      createdAt={video.createdAt}
                      description={video.description}
                      duration={video.duration}
                      isPublished={video.isPublished}
                      owner={Playlist.owner}
                      thumbnail={video.thumbnail}
                      title={video.title}
                      updatedAt={video.updatedAt}
                      videoFile={video.videoFile}
                      views={video.views}
                      __v={video.__v}
                      _id={video._id}
                    />
                  ))
                ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-3xl">No Playlist Available</h1>
        </div>
      )}
    </Layout>
  );
};

export default Playlist;

function calculateTimeDifference(givenDate: Date): string {
  const currentDate = new Date();
  const timeDifferenceInMilliseconds =
    currentDate.getTime() - givenDate.getTime();
  const seconds = Math.floor(timeDifferenceInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const getTimeAgo = (value: number, unit: string): string =>
    value > 0 ? `${value} ${unit}${value === 1 ? "" : "s"} ago` : "";

  return (
    getTimeAgo(years, "year") ||
    getTimeAgo(months, "month") ||
    getTimeAgo(weeks, "week") ||
    getTimeAgo(days, "day") ||
    getTimeAgo(hours, "hour") ||
    getTimeAgo(minutes, "minute") ||
    getTimeAgo(seconds, "second")
  );
}
