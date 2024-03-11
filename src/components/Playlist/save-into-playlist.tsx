import React, { useState, useEffect } from "react";
import { FolderPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import CreateNewPlaylist from "./create-new-playlist";
import useAuth from "@/hooks/useAuth";
import AddToPlaylistPopUp from "./add-to-playlist-popup";
import { getChannelPlaylist } from "@/services/playlist.service.ts";
import Loading from "../loading";

interface VideoType {
  // Define properties for video if needed
}

interface PlaylistType {
  createdAt: string;
  description: string;
  name: string;
  owner: string;
  updatedAt: string;
  videos: VideoType[];
  __v: number;
  _id: string;
}

interface SaveToPlaylistProps {
  videoId: string;
}

const SaveToPlaylist: React.FC<SaveToPlaylistProps> = ({ videoId }) => {
  const [playlists, setPlaylists] = useState<Array<PlaylistType>>([]);
  const [rerender, setRerender] = useState(false);
  const { user } = useAuth();
  const [loadings, setLoadings] = useState(false);
  const fetchUsersPlaylists = async () => {
    try {
      setLoadings(true);
      const response = await getChannelPlaylist(user!._id);
      setPlaylists(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadings(false);
    }
  };
  useEffect(() => {
    fetchUsersPlaylists();
    setRerender(false);
  }, [user, rerender]);

  if (loadings) return <Loading />;
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="gap-2 bg-white text-black hover:bg-slate-300 flex items-center">
          <FolderPlus size={20} />
          <span className="">save</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-center font-bold">
          Save to Playlist
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="overflow-y-auto max-h-32 scroll-m-0 flex flex-col">
          {playlists.map((playlist) => (
            <AddToPlaylistPopUp
              PlaylistName={playlist.name}
              videoId={videoId}
              playlistId={playlist._id}
            />
          ))}
        </div>
        <DropdownMenuSeparator />
        <CreateNewPlaylist updatePlaylist={setRerender} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SaveToPlaylist;
