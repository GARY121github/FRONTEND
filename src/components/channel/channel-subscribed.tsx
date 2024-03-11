import React, { useEffect, useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "../ui/button";
import ChannelAvatar from "./channel-avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Empty from "../empty";
import { Ghost } from "lucide-react";
import Loading from "../loading";
import {
  getSubscribedChannels,
  toggleSubscription,
} from "@/services/subscription.service.ts";

interface SubscribedChannel {
  _id: string;
  fullName: string;
  username: string;
  avatar: string;
  coverImage: string;
  email: string;
}

interface SubscribedChannelWithUsername extends SubscribedChannel {
  username: string;
}

interface SubscribedChannelsProps {
  channelId: string;
}

const SubscribedChannels: React.FC<SubscribedChannelsProps> = ({
  channelId,
}) => {
  const [channels, setChannels] = useState<SubscribedChannelWithUsername[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSubscribedChannels = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getSubscribedChannels(channelId);
      setChannels(response);
    } catch (error) {
      console.error("Error fetching subscribed channels:", error);
      toast({
        title: "Error",
        description: "Failed to fetch subscribed channels.",
        duration: 5000,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [channelId, toast]);

  const toggleSubscriptionHandler = useCallback(
    async (channelId: string) => {
      try {
        await toggleSubscription(channelId);
        fetchSubscribedChannels();
      } catch (error) {
        console.error("Error toggling subscription:", error);
        toast({
          title: "Error",
          description: "Failed to toggle subscription.",
          duration: 5000,
          variant: "destructive",
        });
      }
    },
    [fetchSubscribedChannels, toast]
  );

  useEffect(() => {
    fetchSubscribedChannels();
  }, [fetchSubscribedChannels]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : channels.length === 0 ? (
        <Empty
          className="w-full my-auto min-h-96"
          icon={<Ghost className="bg-sky-700 p-2 rounded-full" size={50} />}
          title="No subscribed channels available"
          description="You have not subscribed to any channels yet."
        />
      ) : (
        <div className="p-2">
          <ul className="flex flex-col gap-2">
            {channels.map((channel) => (
              <li key={channel._id} className="bg-slate-300">
                <div className="flex justify-between p-2 items-center">
                  <div className="flex gap-2 items-center">
                    <ChannelAvatar
                      className="h-14 w-14"
                      avatar={channel.avatar}
                    />
                    <h3 className="text-xl">@{channel.username}</h3>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button className="bg-gray-500 hover:bg-gray-600">
                        Subscribed
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-center">
                          Unsubscribe from @{channel.username}?
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogCancel>cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="ml-2"
                        onClick={() => toggleSubscriptionHandler(channel._id)}
                      >
                        unsubscribe
                      </AlertDialogAction>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SubscribedChannels;
