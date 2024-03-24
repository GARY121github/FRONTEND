import React, { useEffect, useMemo } from "react";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import useAuth from "@/hooks/useAuth";
import EditComment from "./edit-comment";
import DeleteComment from "./delete-comment";
import LikeComment from "./like-comment";

interface Owner {
  _id: string;
  avatar: string;
  fullName: string;
  username: string;
}

interface Comment {
  _id: string;
  content: string;
  createdAt: string; // Assuming you'll parse this into a Date object later
  updatedAt: string; // Assuming you'll parse this into a Date object later
  owner: Owner;
}

interface CommentProps {
  commentId: string;
  text: string;
  fullName: string;
  time: string;
  videoId: string;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
}

const Comment: React.FC<CommentProps> = ({
  commentId,
  text,
  fullName,
  setRerender,
  // videoId,
  time,
}) => {
  // const { user } = useAuth();

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
    <div className="flex w-full justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          <h3 className="text-md font-bold">{fullName}</h3>
          <p className="text-sm">{timeAgo}</p>
          {
            <CommentDropdownMenu
              commentId={commentId}
              text={text}
              setRerender={setRerender}
            />
          }
        </div>
        <h4 className="text-lg">{text}</h4>
      </div>
      <LikeComment likeOf="comment" commentId={commentId} />
    </div>
  );
};

const CommentDropdownMenu: React.FC<{
  commentId: string;
  text: string;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ commentId, text, setRerender }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <MoreVertical size={20} className="cursor-pointer" />
    </DropdownMenuTrigger>
    <DropdownMenuContent className="min-w-24 p-2">
      <EditComment
        commentId={commentId}
        text={text}
        setRerender={setRerender}
      />
      <DropdownMenuSeparator />
      <DeleteComment commentId={commentId} setRerender={setRerender} />
    </DropdownMenuContent>
  </DropdownMenu>
);

export default Comment;
