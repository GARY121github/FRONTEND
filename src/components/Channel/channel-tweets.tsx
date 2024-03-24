import React, { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import Empty from "../empty";
import AddTweet from "../Tweet/add-tweet";
import Tweet from "../Tweet/tweet";
import ChannelAvatar from "./channel-avatar";
import useAuth from "@/hooks/useAuth";
import Loading from "../loading";
import { getChannelTweet } from "@/services/tweet.service.ts";

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
  const [tweets, setTweets] = useState<Array<Tweet>>([]);
  const [rerender, setRerender] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchTweets = async () => {
    try {
      setLoading(true);
      const response = await getChannelTweet(channelId);
      setTweets(response);
      // console.log(response);
    } catch (error) {
      console.error("Error fetching tweets:", error);
      // Handle error gracefully
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTweets();
    setRerender(false);
  }, [rerender, setRerender]);

  return (
    <>
      {user?._id === channelId && <AddTweet setRerender={setRerender} />}
      {loading ? (
        <Loading />
      ) : tweets.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-2 p-2">
          {tweets.map((tweet) => (
            <div
              key={tweet._id}
              className="flex gap-3 bg-slate-300 p-2 rounded-xl"
            >
              <ChannelAvatar avatar={tweet.owner.avatar} />
              <Tweet
                channelId={channelId}
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

const EmptyState: React.FC = () => (
  <Empty
    className="w-full my-auto min-h-96"
    icon={
      <MessageCircle className="bg-sky-700 pl-3 p-2 rounded-full" size={50} />
    }
    title={"No Tweets Available"}
    description={
      "There are no tweets available. Please try searching for something else."
    }
  />
);

export default ChannelTweets;
