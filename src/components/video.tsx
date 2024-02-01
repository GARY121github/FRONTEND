import React from "react";

interface VideoProps {
  url: string;
}

const Video: React.FC<VideoProps> = ({ url }) => {
  return (
    <video className="" controls autoPlay muted>
      <source src={url} type="video/mp4" />
    </video>
  );
};

export default Video;
