import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import VideoUploadForm from "../video-upload-form";
import { Plus } from "lucide-react";
import VideoUploadProgress from "../video-upload-progress";
import { useState } from "react";

const VideoUploadModal = () => {
  const [startUplaod, setStartUpload] = useState(false);

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-center gap-2 justify-center bg-purple-500 p-2 rounded-lg hover:bg-purple-600">
          <Plus size={20} className="text-white" />
          <p className="text-white">New video</p>
        </div>
      </DialogTrigger>
      {startUplaod ? (
        <DialogContent className="bg-gray-900 w-[80%] lg:w-[40%] max-h-[95%] overflow-scroll overflow-x-hidden py-4 rounded-none px-0">
          <DialogHeader className="min-w-full">
            <DialogTitle className="flex justify-between items-center p-2 px-4">
              <div className="flex flex-col gap-1">
                <div className="text-white">Uploading Video...</div>
                <div className="text-white text-sm">
                  Track your video uploading process.
                </div>
              </div>
              <DialogClose className="group/btn mr-1 flex w-auto items-center gap-x-2 bg-[#ae7aff] hover:bg-[#9c60fe] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]">
                Close
              </DialogClose>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <VideoUploadProgress />
          </DialogDescription>
        </DialogContent>
      ) : (
        <DialogContent className="bg-gray-900 w-[65%] max-h-[95%] overflow-scroll overflow-x-hidden py-4 max-w-full rounded-none px-0">
          <DialogHeader className="min-w-full">
            <DialogTitle className="flex justify-between items-center p-2 px-4">
              <div className="text-white">Upload Videos</div>
              <DialogClose className="group/btn mr-1 flex w-auto items-center gap-x-2 bg-[#ae7aff] hover:bg-[#9c60fe] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]">
                Close
              </DialogClose>
            </DialogTitle>
          </DialogHeader>
          <hr />
          <DialogDescription className="px-20">
            <VideoUploadForm setStartUpload={setStartUpload} />
          </DialogDescription>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default VideoUploadModal;
