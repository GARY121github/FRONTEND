import React, { useEffect, useMemo } from "react";
import EditTweet from "./edit-tweet";
import DeleteTweet from "./delete-tweet";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";

interface TweetProps {
  tweetId: string;
  text: string;
  fullName: string;
  time: string;
  channelId: string;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
}

const Tweet: React.FC<TweetProps> = ({
  tweetId,
  text,
  fullName,
  setRerender,
  channelId,
  time,
}) => {
  const { user } = useAuth();

  const timeAgo = useMemo(() => {
    const seconds = Math.floor((new Date() - new Date(time)) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return `${interval} years ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval} months ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} minutes ago`;
    }
    return `${Math.floor(seconds)} seconds ago`;
  }, [time]);

  useEffect(() => {}, [setRerender]);

  return (
    <div>
      <div className="flex gap-4 items-center">
        <h3 className="text-md font-bold">{fullName}</h3>
        <p className="text-sm">{timeAgo}</p>
        {user?._id === channelId && (
          <TweetDropdownMenu
            tweetId={tweetId}
            text={text}
            setRerender={setRerender}
          />
        )}
      </div>
      <h4 className="text-lg">{text}</h4>
    </div>
  );
};

const TweetDropdownMenu: React.FC<{
  tweetId: string;
  text: string;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ tweetId, text, setRerender }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <MoreVertical size={20} className="cursor-pointer" />
    </DropdownMenuTrigger>
    <DropdownMenuContent className="min-w-24 p-2">
      <EditTweet tweetId={tweetId} text={text} setRerender={setRerender} />
      <DropdownMenuSeparator />
      <DeleteTweet tweetId={tweetId} setRerender={setRerender} />
    </DropdownMenuContent>
  </DropdownMenu>
);

export default Tweet;
