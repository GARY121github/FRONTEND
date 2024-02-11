import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChannelAvatarProps {
  avatar: string;
  className?: string;
}

const ChannelAvatar: React.FC<ChannelAvatarProps> = ({
  avatar,
  className = "",
}) => {
  // Provide default value for className
  return (
    <Avatar className={className}>
      <AvatarImage src={avatar} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default ChannelAvatar;
