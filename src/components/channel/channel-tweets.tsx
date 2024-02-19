import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { MessageCircle } from "lucide-react";
import Empty from "../empty";
import AddTweet from "../Tweet/add-tweet";
import Tweet from "../Tweet/tweet";
import ChannelAvatar from "./channel-avatar";
import useAuth from "@/hooks/useAuth";

interface Owner {
  _id: string;
  avatar: string;
  fullName: string;
  username: string;
}

interface Tweet {
  _id: string;
  content: string;
  createdAt: string; // Assuming you'll parse this into a Date object later
  updatedAt: string; // Assuming you'll parse this into a Date object later
  owner: Owner;
}

interface ChannelTweetsProps {
  channelId: string;
}

const ChannelTweets: React.FC<ChannelTweetsProps> = ({ channelId }) => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [rerender, setRerender] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchTweets = async () => {
    try {
      const storedAccessToken = localStorage.getItem("accessToken");
      if (!storedAccessToken) {
        // If there's no stored access token, show a toast message and navigate to the login page
        toast({
          variant: "destructive",
          title: "Unauthorized",
          description: "You need to log in first to access this page.",
        });
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `http://localhost:8000/api/v1/tweets/user/${channelId}`,
        {
          headers: {
            Authorization: `Bearer ${storedAccessToken}`,
          },
        }
      );
      setTweets(response.data.data);
      setLoading(false);
    } catch (error) {
      // Handle errors gracefully
      console.error("Error fetching tweets:", error);
      // You might want to show a toast message here as well
    }
  };

  useEffect(() => {
    fetchTweets();
    setRerender(false);
  }, [rerender , setRerender]);

  return (
    <>
      {user?._id === channelId && <AddTweet setRerender={setRerender} />}
      {loading ? ( // Render loading state if data is being fetched
        <div>Loading...</div>
      ) : tweets.length === 0 ? ( // Render message when no tweets available
        // TODO: Add a message to show when there are no tweets
        <Empty
          className="w-full my-auto min-h-96"
          icon={
            <MessageCircle
              className="bg-sky-700 pl-3 p-2 rounded-full"
              size={50}
            />
          }
          title={"No Tweets Available"}
          description={
            "There are no tweets here available. Please try to search some thing else."
          }
        />
      ) : (
        <div className="flex flex-col gap-2 p-2 ">
          {tweets.map((tweet) => (
            <div className="flex gap-3 bg-slate-300 p-2 rounded-xl">
              <ChannelAvatar
                className="h-14 w-14"
                avatar={tweet.owner.avatar}
              />
              <Tweet
                channelId={channelId}
                key={tweet._id}
                tweetId={tweet._id}
                text={tweet.content}
                fullName={tweet.owner.fullName}
                time={tweet.updatedAt}
                setRerender={setRerender}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ChannelTweets;
