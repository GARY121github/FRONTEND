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
import axios from "axios";
import AddToPlaylistPopUp from "./add-to-playlist-popup";


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

  const fetchUsersPlaylists = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/playlist/user/${user?._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setPlaylists(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsersPlaylists();
    setRerender(false);
  }, [user, rerender]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="gap-2 bg-white text-black hover:bg-slate-300 flex items-center">
          <FolderPlus size={20} />
          <span className="">save</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-center font-bold">Save to Playlist</DropdownMenuLabel>
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
