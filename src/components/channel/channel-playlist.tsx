import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Empty from "../empty";
import { Folder } from "lucide-react";

interface Playlist {
  createdAt: string; // Date and time when the collection was created
  description: string; // Description of the video collection
  name: string; // Name of the video collection
  owner: string; // ID of the owner of the video collection
  thumbnail: string; // URL of the thumbnail image for the video collection
  updatedAt: string; // Date and time when the collection was last updated
  videos: string[]; // Array of IDs of videos in the collection
  __v: number; // Version number or any other version-related data
  _id: string; // Unique identifier for the video collection
}

interface ChannelPlaylistProps {
  channelId: string;
}

const ChannelPlaylist: React.FC<ChannelPlaylistProps> = ({ channelId }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchPlaylists = async () => {
    try {
      const storedAccessToken = localStorage.getItem("accessToken");
      if (!storedAccessToken) {
        // If there's no stored access token, show a toast message and navigate to the login page
        toast({
          variant: "destructive",
          title: "Unauthorized",
          description: "You need to log in first to access this page.",
        });
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `http://localhost:8000/api/v1/playlist/user/${channelId}`,
        {
          headers: {
            Authorization: `Bearer ${storedAccessToken}`,
          },
        }
      );

      // Update state with fetched playlists
      console.log(response);
      setPlaylists(response.data.data);
      setLoading(false);
    } catch (error) {
      // Handle errors gracefully
      console.error("Error fetching playlists:", error);
      // You might want to show a toast message here as well
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <div className="p-4">
      {loading ? ( // Render loading state if data is being fetched
        <div>Loading...</div>
      ) : playlists.length === 0 ? ( // Render message when no playlists available
        <Empty
          className="w-full my-auto min-h-96"
          icon={
            <Folder className="bg-sky-700 pl-3 p-2 rounded-full" size={50} />
          }
          title={"No Playlist Available"}
          description={
            "There are no playlists here available. Please try to search some thing else."
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 p-1">
          {playlists.map((playlist) => (
            <div className="w-full cursor-pointer">
              <Link to={`playlist/${playlist._id}`}>
                <div className="relative mb-2 w-full pt-[56%]">
                  <div className="absolute inset-0">
                    <img
                      src={playlist.thumbnail}
                      alt={playlist.name}
                      className="h-full w-full "
                    />
                    <div className="absolute inset-x-0 bottom-0">
                      <div className="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
                        <div className="relative z-[1]">
                          <p className="flex justify-between">
                            <span className="inline-block">Playlist</span>
                            <span className="inline-block">
                              {playlist.videos.length} videos
                            </span>
                          </p>
                          <p className="text-sm text-gray-200">
                            120K Views |{" "}
                            {calculateTimeDifference(
                              new Date(playlist.createdAt)
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h6 className="mb-1 font-semibold text-2xl text-white">
                  {playlist.name}
                </h6>
                <p className="flex text-sm text-gray-200">
                  {playlist.description}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChannelPlaylist;

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
