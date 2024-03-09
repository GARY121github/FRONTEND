import React from "react";
import { Button } from "./ui/button";
import { Film } from "lucide-react";
import Loading from "./loading";

interface VideoUploadProgressProps {
  videoFile: File;
}

const VideoUploadProgress: React.FC<VideoUploadProgressProps> = ({
  videoFile,
}) => {
  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="flex flex-col gap-2 border p-4">
        <div className="flex gap-2">
          <Film
            className="p-1 rounded-full bg-purple-200 text-purple-400"
            size={32}
          />
          <div className="flex flex-col">
            <div>{videoFile?.name}</div>
            <div>
              {videoFile && Math.round(videoFile.size / 10 ** 6) + " MB"}
            </div>
          </div>
        </div>
        <div className="flex gap-1 items-center ml-4">
          <Loading className="max-h-5 max-w-5" />
          <div>Uploading...</div>
        </div>
      </div>
    </div>
  );
};

export default VideoUploadProgress;
