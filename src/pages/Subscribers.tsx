import { useState, useEffect } from "react";
import Layout from "@/components/Layout/pages-layout";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import ChannelList from "@/components/Channel/channel-list";
import Loading from "@/components/loading";
import { fetchingSubscribers } from "@/services/subscription.service";

interface User {
  avatar: string;
  email: string;
  fullName: string;
  username: string;
  _id: string;
}

interface Subscriber {
  subscriber: User;
}

const Subscribers = () => {
  const { user } = useAuth();
  const [data, setData] = useState<Array<Subscriber>>([]);
  const [loading, setLoading] = useState(false);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const response = await fetchingSubscribers();
      setData(response);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : data.length === 0 ? (
        <h1>No Subscribers Available</h1>
      ) : (
        <div className="flex flex-col gap-6 p-5">
          {data.map((subscriber) => (
            <ChannelList
              key={subscriber.subscriber._id}
              avatar={subscriber.subscriber.avatar}
              fullName={subscriber.subscriber.fullName}
              username={subscriber.subscriber.username}
              className="border-b-2 pb-8"
            />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Subscribers;
