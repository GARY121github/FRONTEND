import React from "react";

interface VideoProps {
  url: string;
}

const Video: React.FC<VideoProps> = ({ url }) => {
  return (
    <video className="object-cover w-full h-[450px] rounded-xl bg-black" controls autoPlay muted>
      <source src={url} type="video/mp4" />
    </video>
  );
};

export default Video;
