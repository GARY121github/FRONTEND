import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { MessageCircle } from "lucide-react";
import Empty from "../empty";

interface Tweet {
  id: string;
  text: string;
  // Add more properties if available
}

interface ChannelTweetsProps {
  channelId: string;
}

const ChannelTweets: React.FC<ChannelTweetsProps> = ({ channelId }) => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

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
      console.log(response);
      // Update state with fetched tweets
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
  }, []);

  return (
    <>
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
        <div>
          {/* Render tweets here */}
          <h1>Tweets</h1>
          {/* Example: Render each tweet */}
          <ul>
            {tweets.map((tweet) => (
              <li key={tweet.id}>{tweet.text}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ChannelTweets;
