import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout/pages-layout";
import useAuth from "@/hooks/useAuth";
import VideoUploadModal from "@/components/Modals/video-upload-modal";
import DashBoardCard from "@/components/Dashboard/dashboard-card";
import { Eye, UserRound, Heart } from "lucide-react";
import DashBoardVideoStats from "@/components/Dashboard/dashboard-video-stats";
import Loading from "@/components/loading";
import { fetchingDashboard } from "@/services/dashboard.service";

interface Stats {
  totalLikes: number;
  totalSubscribers: number;
  totalVideosViews: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null); // Initialized with null
  const [loading, setLoading] = useState(false); // Initialized with true
  const [refreshList, setRefreshList] = useState(false);
  const { user } = useAuth();

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await fetchingDashboard();
      setStats(response.stats);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };
  console.log(stats);
  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <Layout className="p-2">
      <section className="p-4 flex flex-col gap-4">
        <div className="flex justify-between w-full">
          <div>
            <h1 className="text-white text-2xl font-semibold">
              Welcome Back, {user?.username}
            </h1>
            <p className="text-slate-300 text-md">
              Here's what's happening with your channel today
            </p>
          </div>
          <VideoUploadModal setRefreshList={setRefreshList} />
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {stats && (
              <div className="grid grid-col-3 grid-flow-col gap-2 grid-nowrap">
                <DashBoardCard
                  icon={
                    <Eye
                      className="text-white bg-black rounded-full p-2"
                      size={40}
                    />
                  }
                  title="Total views"
                  value={stats.totalVideosViews}
                />
                <DashBoardCard
                  icon={
                    <UserRound
                      className="text-white bg-black rounded-full p-2"
                      size={40}
                    />
                  }
                  title="Subscribers"
                  value={stats.totalSubscribers}
                />
                <DashBoardCard
                  icon={
                    <Heart
                      className="text-white bg-black rounded-full p-2"
                      size={40}
                    />
                  }
                  title="Total Likes"
                  value={stats.totalLikes}
                />
              </div>
            )}
          </div>
        )}
      </section>
      <section className="p-4">
        <DashBoardVideoStats
          refreshList={refreshList}
          setRefreshList={setRefreshList}
        />
      </section>
    </Layout>
  );
};

export default Dashboard;
