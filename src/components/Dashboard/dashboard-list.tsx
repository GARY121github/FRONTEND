import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import ChannelAvatar from "@/components/Channel/channel-avatar";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Loading from "../loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import VideoEditModal from "../Modals/video-edit-modal";
import {
  togglePublishingOfVideo,
  deleteVideo,
} from "@/services/videos.service.ts";

interface VideoProps {
  setRefresh: (value: boolean) => void;
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  likes: number;
  createdAt: string;
  isPublished: boolean;
}

const DashBoardList: React.FC<VideoProps> = ({
  setRefresh,
  _id,
  title,
  description,
  thumbnail,
  likes,
  createdAt,
  isPublished,
}) => {
  const [published, setPublished] = useState<boolean>(isPublished);
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  };

  const togglePublishedVideo = async () => {
    try {
      setPublished((prev) => !prev);
      await togglePublishingOfVideo(_id);
    } catch (error) {
      console.error("Error toggling published video:", error);
      setPublished((prev) => !prev); // Revert the state if an error occurs
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteVideo(_id);
      setRefresh(true);
      toast({
        title: "Video Deleted",
        description: "Video Deleted Successfully!",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Deletion Failed",
        description: "Video Deletion Failed!",
        variant: "destructive",
      });
      console.error("Error deleting video:", error);
    } finally {
      setLoading(false);
    }
  };

  if(loading) return <Loading />
  return (
    <div className="border-b-2 border-dotted">
      <div className="grid grid-cols-10 gap-4 p-2 items-center">
        <div className="text-lg text-white font-semibold">
          <Switch checked={published} onCheckedChange={togglePublishedVideo} />
        </div>
        <div
          className={`border rounded-3xl p-2 ${
            published ? "border-green-600" : "border-red-600"
          }`}
        >
          <h3
            className={`text-md text-center font-semibold ${
              published ? "text-green-600" : "text-red-600"
            }`}
          >
            {published ? "Published" : "Unpublished"}
          </h3>
        </div>

        <div className="col-span-5 grid grid-cols-3 items-center gap-2">
          <div className="col-span-1 justify-self-end">
            <ChannelAvatar avatar={thumbnail} />
          </div>
          <div className="col-span-2 justify-self-start">
            <h3 className="text-center text-lg text-white font-semibold">
              {title.length > 20 ? title.slice(0, 20) + "..." : title}
            </h3>
          </div>
        </div>

        <div>
          <p className="bg-green-500 inline-block  p-1 pl-3 pr-3 text-center rounded-full ">
            {likes} likes
          </p>
        </div>
        <h3 className="col-span-2 text-lg text-white font-semibold flex justify-around items-center">
          <div className="">
            <p className="text-center">{formatDate(createdAt)}</p>
          </div>
          <div className="flex gap-1">
            <AlertDialog>
              <AlertDialogTrigger>
                <Button>
                  <Trash2 size={15} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-center">
                    {"Delete Video?"}
                  </AlertDialogTitle>
                </AlertDialogHeader>

                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="ml-2"
                  onClick={() => handleDelete()}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogContent>
            </AlertDialog>
            <VideoEditModal
              setRefresh={setRefresh}
              thumbnail={thumbnail}
              title={title}
              description={description}
              _id={_id}
            />
          </div>
        </h3>
      </div>
    </div>
  );
};

export default DashBoardList;
