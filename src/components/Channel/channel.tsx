import { useEffect, useState, useMemo, ReactNode, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import ChannelCoverImage from "./channel-coverImage";
import ChannelAvatar from "./channel-avatar";
import { Button } from "../ui/button";
import useAuth from "@/hooks/useAuth";
import ChannelPlaylists from "./channel-playlist";
import ChannelsSubscribed from "./channel-subscribed";
import ChannelTweets from "./channel-tweets";
import ChannelVideos from "./channel-videos";
import UploadVideo from "@/components/Modals/video-upload-modal";
import Loading from "../loading";
import { getUsersChannel } from "@/services/user.service.ts";
import { toggleSubscription } from "@/services/subscription.service.ts";

interface ChannelDetails {
  _id: string;
  username: string;
  fullName: string;
  avatar: string;
  coverImage: string;
  subscribersCount: number;
  channelsSubscriberToCount: number;
  isSubscribed: boolean;
}

interface ChannelItem {
  name: string;
  component: ReactNode;
}

const Channel = () => {
  const { channelName } = useParams<{ channelName: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [channel, setChannel] = useState<ChannelDetails | null>(null);
  const [reloadChannel, setReloadChannel] = useState(false);
  const [loading, setLoading] = useState(false);

  const [component, setComponent] = useState<ReactNode>();

  const fetchChannelDetails = useCallback(
    async (channelName: string) => {
      try {
        setLoading(true);
        const response = await getUsersChannel(channelName.substring(1));
        setChannel(response);
        setLoading(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch channel details.",
        });
        navigate("/channel-not-found");
      }
    },
    [toast, navigate]
  );

  const toggelSubscriptionHandler = useCallback(async () => {
    try {
      await toggleSubscription(channel!._id);
      setReloadChannel(true);
    } catch (error) {
      console.log(error);
    }
  }, [channel, toast, navigate]);

  useEffect(() => {
    fetchChannelDetails(channelName!);
  }, [channelName, fetchChannelDetails, reloadChannel]);

  useEffect(() => {
    // Reset reloadChannel after the effect is triggered
    setReloadChannel(false);
  }, [reloadChannel, user, channelName]);

  const channelItems = useMemo<ChannelItem[]>(() => {
    if (!channel || !channelName) return [];

    const items: ChannelItem[] = [
      {
        name: "Videos",
        component: <ChannelVideos channelName={channelName} />,
      },
      {
        name: "Playlists",
        //   channelId: channel._id,
        // },
        component: <ChannelPlaylists channelId={channel._id} />,
      },
      {
        name: "Tweets",
        component: <ChannelTweets channelId={channel._id} />,
      },
    ];

    if (user?.username === channelName?.substring(1)) {
      items.push({
        name: "Subscribed",
        component: <ChannelsSubscribed channelId={channel._id} />,
      });
    }

    setComponent(<ChannelVideos channelName={channelName} />);
    return items;
  }, [channel, user, channelName]);

  const handleItemClick = (index: number) => {
    setComponent(channelItems[index].component);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-2">
          <section>
            {channel && (
              <div className="relative">
                <ChannelCoverImage coverImage={channel.coverImage} />
                <ChannelAvatar
                  avatar={channel.avatar}
                  className="h-36 w-36 absolute -bottom-14 left-4"
                />
              </div>
            )}
          </section>
          <section>
            {channel && (
              <div className="ml-[10rem] -mt-2 p-2 flex justify-between items-center">
                <div>
                  <h2 className="text-white text-2xl">@{channel.username}</h2>
                  <h3 className="text-white text-xl">
                    {channel.fullName.toLowerCase()} |{" "}
                    <span className="text-lg text-slate-200">
                      {channel.subscribersCount} subscribers
                    </span>
                  </h3>
                </div>
                {user?.username !== channelName?.substring(1) ? (
                  <Button
                    className={`${
                      channel.isSubscribed
                        ? "bg-gray-500 hover:bg-gray-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                    onClick={toggelSubscriptionHandler}
                  >
                    {channel.isSubscribed ? "Subscribed" : "Subscribe"}
                  </Button>
                ) : (
                  <UploadVideo />
                )}
              </div>
            )}
          </section>
          <section className="p-2">
            {channel && (
              <div className="flex mt-2 items-center justify-between border-b-2">
                {channelItems.map((item, index) => (
                  <div
                    className={`p-2 text-xl cursor-pointer hover:bg-white hover:text-black transition-all duration-300 ease-in-out w-full text-center ${
                      component === channelItems[index].component
                        ? "bg-white text-black"
                        : "text-white"
                    }`}
                    key={index}
                    onClick={() => handleItemClick(index)}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </section>
          <section>{component}</section>
        </div>
      )}
    </>
  );
};

export default Channel;
