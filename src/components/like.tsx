import React, { useState, useEffect } from "react";
import { ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { togglingLike, videoLikes } from "@/services/like.service";

interface likeProps {
  likeOf: string;
  id: string;
}

const Like: React.FC<likeProps> = ({ likeOf, id }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [like, setLike] = useState<number>(0);

  const getVideoLikes = async () => {
    try {
      const response = await videoLikes(id);
      setLike(response.totalLikes);
      setIsLiked(response.isLikedByUser);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleLike = async () => {
    try {
      isLiked ? setLike((like) => like - 1) : setLike((like) => like + 1);
      setIsLiked((isLiked) => !isLiked);
      await togglingLike(id);
      getVideoLikes();
    } catch (error) {
      isLiked ? setLike((like) => like + 1) : setLike((like) => like - 1);
      setIsLiked((isLiked) => !isLiked);
      console.log(error);
    }
  };

  useEffect(() => {
    if (likeOf === "video") {
      getVideoLikes();
    }
  }, []);
  return (
    <Button
      className="gap-2"
      onClick={() => {
        likeOf === "video" && toggleLike();
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

export default Like;
