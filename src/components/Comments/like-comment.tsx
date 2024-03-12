import React, { useState, useEffect } from "react";
import { ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { togglingCommentLike } from "@/services/like.service";

interface likeProps {
  likeOf: string;
  commentId: string;
}

const LikeComment: React.FC<likeProps> = ({ likeOf, commentId }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [like, setLike] = useState<number>(0);

  //   const getCommentLikes = async () => {
  //     try {
  //       const response = await commentLikes(id);
  //       setLike(response.totalLikes);
  //       setIsLiked(response.isLikedByUser);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const toggleCommentLike = async () => {
    try {
      isLiked ? setLike((like) => like - 1) : setLike((like) => like + 1);
      setIsLiked((isLiked) => !isLiked);
      await togglingCommentLike(commentId);
      //   getCommentLikes();
    } catch (error) {
      isLiked ? setLike((like) => like + 1) : setLike((like) => like - 1);
      setIsLiked((isLiked) => !isLiked);
      console.log(error);
    }
  };

  //   useEffect(() => {
  //     if (likeOf === "video") {
  //       getVideoLikes();
  //     }
  //   }, []);
  return (
    <Button
      className="gap-2"
      onClick={() => {
        likeOf === "comment" && toggleCommentLike();
        setIsLiked(!isLiked);
      }}
    >
      <ThumbsUp
        className={`${isLiked ? "text-green-700" : "text-red-700"}`}
        size={20}
      />
      <span>{like}</span>
    </Button>
  );
};

export default LikeComment;
