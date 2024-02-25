import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Empty from "../empty";
import { Folder } from "lucide-react";

interface Playlist {
  id: string;
  title: string;
  
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
    <>
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
        <div>
          {/* Render playlists here */}
          <h1>Playlists</h1>
          {/* Example: Render each playlist */}
          <ul>
            {playlists.map((playlist) => (
              <li key={playlist.id}>{playlist.title}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ChannelPlaylist;
