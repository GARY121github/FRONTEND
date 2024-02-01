import React from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LikeUnlike {
  like: number;
  unlike: number;
}

const LikeUnlikeButtons: React.FC<LikeUnlike> = ({ like, unlike }) => {
  return (
    <div className="flex p-1 border border-black rounded-lg">
      <Button className="bg-inherit hover:bg-slate-500 shadow-none rounded-md flex gap-1 items-center">
        <ThumbsUp className="mt-1" />
        {like > 0 ? <span className="text-base">{like}</span> : null}
      </Button>
      <Button className="bg-inherit hover:bg-slate-500 shadow-none rounded-md flex gap-1 items-center">
        <ThumbsDown />
        {unlike > 0 ? <span className="text-base">{unlike}</span> : null}
      </Button>
    </div>
  );
};

export default LikeUnlikeButtons;
