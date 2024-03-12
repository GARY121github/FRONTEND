import { Play } from "lucide-react";

const VideoEmpty = () => {
  return (
    <div className="h-dvh">
      <div className="flex justify-center items-center flex-col space-y-2 my-auto h-full">
        <Play
          className="text-blue-700 rounded-full bg-sky-500 pl-1 py-2.5"
          size={40}
        />
        <h1 className="text-2xl text-white font-semibold">
          No videos available
        </h1>
        <p className="text-white text-center">
          There are no videos here available. Please try
          <br /> to search some thing else.
        </p>
      </div>
    </div>
  );
};

export default VideoEmpty;
