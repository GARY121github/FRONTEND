import { useState, useEffect } from "react";
import DashBoardList from "./dashboard-list";
import Loading from "../loading";
import { getChannelsDashboardVideos } from "@/services/dashboard.service.ts";

interface Video {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
}

interface DashboardVideoStatsProps {
  refreshList: boolean;
  setRefreshList: (value: boolean) => void;
}

interface DashboardVideo extends Video {
  // Define additional properties if necessary
}

const DashboardVideoStats: React.FC<DashboardVideoStatsProps> = ({
  refreshList,
  setRefreshList,
}) => {
  const [videos, setVideos] = useState<Array<DashboardVideo>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await getChannelsDashboardVideos();
      setVideos(response); 
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
    setRefresh(false);
    setRefreshList(false);
  }, [refresh, refreshList]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="grid grid-cols-10 gap-4 p-2 border-b-2 border-white">
          <h3 className="text-lg text-white font-semibold">Status</h3>
          <h3 className="text-lg text-white font-semibold">Is Published</h3>
          <h3 className="col-span-5 text-center text-lg text-white font-semibold">
            Uploaded
          </h3>
          <h3 className="text-lg text-white font-semibold">Rating</h3>
          <h3 className="col-span-2 text-lg text-white font-semibold">
            Date Uploaded
          </h3>
        </div>
      </div>
      <div className="dashboard-list">
        {videos && videos.length > 0 ? ( // Add a null check for videos before accessing its length property
          videos.map((video) => (
            <DashBoardList setRefresh={setRefresh} key={video._id} {...video} />
          ))
        ) : (
          <div className="flex flex-col justify-center items-center h-72">
            <h1 className="text-white text-2xl">No videos available</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardVideoStats;
