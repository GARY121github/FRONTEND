import { useState, useEffect } from "react";
import DashBoardList from "./dashboard-list";
import axios from "axios";
import Loading from "../loading";

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

const DashboardVideoStats: React.FC<DashboardVideoStatsProps> = ({
  refreshList,
  setRefreshList,
}) => {
  const [videos, setVideos] = useState<Array<Video>>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8000/api/v1/dashboard/videos",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response);
      setVideos(response.data.data.videos);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
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
    <div className="border-2 border-white ">
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
      {videos &&
        videos.map((video) => {
          return (
            <DashBoardList
              setRefresh={setRefresh}
              key={video._id}
              thumbnail={video.thumbnail}
              description={video.description}
              title={video.title}
              likes={video.likes}
              createdAt={video.createdAt}
              isPublished={video.isPublished}
              _id={video._id}
            />
          );
        })}
    </div>
  );
};

export default DashboardVideoStats;
