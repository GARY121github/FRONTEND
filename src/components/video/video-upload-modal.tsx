import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import VideoUploadForm from "../video-upload-form";

const VideoUploadModal = () => {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="bg-gray-900 w-[65%] h-[95%] overflow-scroll py-4">
        <DialogHeader className="min-w-full">
          <DialogTitle className="flex justify-between items-center p-2 px-4">
            <div className="text-white">Upload Videos</div>
            <div className="bg-gray-500">
              <button className="bg-purple-500 border-gray-500 p-2 hover:bg-purple-600">
                Save
              </button>
            </div>
          </DialogTitle>
        </DialogHeader>
        <hr />
        <DialogDescription className="px-20">
          <VideoUploadForm />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default VideoUploadModal;
