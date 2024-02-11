import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface Video {
  // Define the structure of a video
  id: string;
  title: string;
  // Add more properties if available
}

interface ChannelVideosProps {
  channelName: string;
}

const ChannelVideos: React.FC<ChannelVideosProps> = ({ channelName }) => {
  const [videos, setVideos] = useState<Video[]>([]); // Specify the type for videos as an array of Video
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchVideos = async () => {
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
        `http://localhost:8000/api/v1/videos/v/${channelName.substring(1)}`,
        {
          headers: {
            Authorization: `Bearer ${storedAccessToken}`,
          },
        }
      );

      // Update state with fetched videos
      setVideos(response.data.data);
      setLoading(false);
    } catch (error) {
      // Handle errors gracefully
      console.error("Error fetching videos:", error);
      // You might want to show a toast message here as well
    }
  };

  useEffect(() => {
    fetchVideos();
    console.log("Videos fetched");
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : videos.length === 0 ? ( 
        // TODO: Add a message to show when there are no videos
        // Check if there are no videos
        <h1>No videos yet</h1>
      ) : (
        <>
          <h1>Videos Page</h1>
          {/* Render videos here */}
        </>
      )}
    </>
  );
};

export default ChannelVideos;
