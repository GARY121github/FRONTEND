import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ListPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

interface CreatePlaylistProps {
  updatePlaylist: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateNewPlaylist: React.FC<CreatePlaylistProps> = ({
  updatePlaylist,
}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const thumbnailRef = useRef<HTMLInputElement>(null); // Ref for thumbnail input
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false); // State to control modal open/close

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    if (
      nameRef.current &&
      descriptionRef.current &&
      thumbnailRef.current && // Check if thumbnailRef is present
      nameRef.current.value.trim().length !== 0 &&
      descriptionRef.current.value.trim().length !== 0
    ) {
      const formData = new FormData();
      formData.append("name", nameRef.current.value);
      formData.append("description", descriptionRef.current.value);
      formData.append("thumbnail", thumbnailRef.current.files![0]); // Append the file to FormData

      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/playlist",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log(response);
        toast({
          variant: "success",
          title: "Playlist created",
          description: "Playlist has been created successfully.",
        });
        setIsOpen(false); // Close modal after playlist is created
        updatePlaylist((prev) => !prev); // Rerender the component to fetch updated playlists
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to create playlist.",
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Invalid input",
        description: "Name, description, and thumbnail are required.",
      });
    }
  };

  return (
    <>
      <Dialog open={isOpen}>
        <DialogTrigger asChild>
          <Button
            className="flex items-center gap-2"
            onClick={() => setIsOpen(true)}
          >
            <ListPlus /> create new playlist
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-96 p-5 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-center">
              Create new playlist
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter playlist name"
                  className="col-span-3"
                  autoComplete="off"
                  ref={nameRef}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter playlist description"
                  className="col-span-3"
                  ref={descriptionRef}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="thumbnail" className="text-right">
                  Thumbnail
                </Label>
                <Input
                  id="thumbnail"
                  type="file" // Set input type to file for uploading
                  ref={thumbnailRef}
                  accept="image/*" // Set accepted file types to images
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="destructive" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateNewPlaylist;
