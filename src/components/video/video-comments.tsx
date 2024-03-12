import React, { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import Empty from "../empty";
// import useAuth from "@/hooks/useAuth";
import Comment from "../Comments/comment";
import Loading from "../loading";
import { getVideoComments } from "@/services/comment.service.ts";
import AddComment from "../Comments/add-comment";

interface Owner {
  _id: string;
  avatar: string;
  fullName: string;
  username: string;
}

interface CommentStruct {
  _id: string;
  content: string;
  createdAt: string; // Assuming you'll parse this into a Date object later
  updatedAt: string; // Assuming you'll parse this into a Date object later
  owner: Owner;
}

interface VideoCommentsProps {
  videoId: string;
}

const VideoComments: React.FC<VideoCommentsProps> = ({ videoId }) => {
  const [comments, setComments] = useState<CommentStruct[]>([]);
  const [rerender, setRerender] = useState(false);
  const [loading, setLoading] = useState(true);
  //   const { user } = useAuth();

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await getVideoComments(videoId);
      setComments(response);
      //   console.log(response);
    } catch (error) {
      console.error("Error fetching comments:", error);
      // Handle error gracefully
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
    setRerender(false);
  }, [rerender, setRerender]);

  return (
    <>
      {<AddComment videoId={videoId} setRerender={setRerender} />}
      {loading ? (
        <Loading />
      ) : comments.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-2 p-2">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="flex gap-3 bg-slate-300 p-2 rounded-xl"
            >
              {/* <ChannelAvatar avatar={comment.owner.avatar} /> */}
              <Comment
                videoId={videoId}
                commentId={comment._id}
                text={comment.content}
                fullName={comment.owner.fullName}
                time={comment.updatedAt}
                setRerender={setRerender}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const EmptyState: React.FC = () => (
  <Empty
    className="w-full my-auto min-h-96"
    icon={
      <MessageCircle className="bg-sky-700 pl-3 p-2 rounded-full" size={50} />
    }
    title={"No Comments Available"}
    description={
      "There are no comments available. Please try searching for something else."
    }
  />
);

export default VideoComments;
