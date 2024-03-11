import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { saveVideoIntoPlaylist } from "@/services/playlist.service";

interface AddToPlayListPopUpProps {
  PlaylistName: string;
  videoId: string;
  playlistId: string;
}

const AddToPlayListPopUp: React.FC<AddToPlayListPopUpProps> = ({
  PlaylistName,
  videoId,
  playlistId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const addToPlaylist = async () => {
    try {
      await saveVideoIntoPlaylist(videoId, playlistId);
      toast({
        variant: "success",
        title: "Video added",
        description: `Video has been added to ${PlaylistName} playlist.`,
      });
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Any side effects can be placed here
  }, [isOpen]);

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          {PlaylistName}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-96 p-4 rounded-xl">
        <DialogHeader>
          <DialogTitle>
            <p className="text-center text-lg">
              Do you want to add this video to{" "}
              <span className="font-bold">{PlaylistName}</span> playlist?
            </p>
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={addToPlaylist}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToPlayListPopUp;
