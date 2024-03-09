import {
  Dialog,
  // DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import VideoEditForm from "../video-edit-form";
import { useState } from "react";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";

interface Video {
  setRefresh: (value: boolean) => void;
  _id: string;
  thumbnail: string;
  title: string;
  description: string;
}

const VideoEditModal: React.FC<Video> = ({
  setRefresh,
  _id,
  thumbnail,
  title,
  description,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen}>
      <DialogTrigger>
        <Button onClick={() => setIsOpen(true)}>
          <Pencil size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 w-[80%] lg:w-[40%] max-h-[95%] overflow-scroll overflow-x-hidden py-4 rounded-none p-4">
        <DialogHeader className="min-w-full">
          <DialogTitle className="flex justify-between items-center p-2">
            <div className="flex flex-col gap-1">
              <div className="text-white">Edit Video</div>
              <div className="text-white text-sm">
                Share where you've worked on your profile.
              </div>
            </div>
            <button
              className="group/btn mr-1 flex w-auto items-center gap-x-2 bg-[#ae7aff] hover:bg-[#9c60fe] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <VideoEditForm
            setRefresh={setRefresh}
            setIsOpen={setIsOpen}
            _id={_id}
            thumbnail={thumbnail}
            title={title}
            description={description}
          />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default VideoEditModal;
