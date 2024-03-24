import React, { useState, useEffect } from "react";
import { ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { togglingTweetLike } from "@/services/like.service";

interface likeProps {
  likeOf: string;
  tweetId: string;
}

const LikeTweet: React.FC<likeProps> = ({ likeOf, tweetId }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [like, setLike] = useState<number>(0);

  //   const getTweetLikes = async () => {
  //     try {
  //       const response = await tweetLikes(id);
  //       setLike(response.totalLikes);
  //       setIsLiked(response.isLikedByUser);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const toggleTweetLike = async () => {
    try {
      isLiked ? setLike((like) => like - 1) : setLike((like) => like + 1);
      setIsLiked((isLiked) => !isLiked);
      await togglingTweetLike(tweetId);
      //   getTweetLikes();
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
        likeOf === "tweet" && toggleTweetLike();
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

export default LikeTweet;
