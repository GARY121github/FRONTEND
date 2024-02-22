import React from "react";
import { ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LikeUnlike {
  like: number;
}

const Like: React.FC<LikeUnlike> = ({ like }) => {
  return (
    <Button className="gap-2">
      <ThumbsUp size={20} />
      <span>{like}</span>
    </Button>
  );
};

export default Like;
