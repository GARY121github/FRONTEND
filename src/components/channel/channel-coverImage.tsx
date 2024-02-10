import React from "react";

interface ChannelCoverImageProps {
  coverImage: string;
}
const ChannelCoverImage: React.FC<ChannelCoverImageProps> = ({
  coverImage,
}) => {
  return (
    <div className="relative">
      <img
        src={coverImage}
        alt="cover"
        className="w-full h-60 object-cover" // Error: JSX element img has no src prop
      />
    </div>
  );
};

export default ChannelCoverImage;
