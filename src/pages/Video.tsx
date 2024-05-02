import Layout from "@/components/Layout/pages-layout";
import VideoPlayer from "@/components/video/video-detail";
import VideoRecommendations from "@/components/video/video-recommendations";

const Video = () => {
  return (
    <Layout>
      <div className="grid grid-cols-6 gap-2 p-2">
        <div className="col-span-6 lg:col-span-4">
          <VideoPlayer />
        </div>
        <div className="flex flex-col gap-2 lg:col-span-2">
          <VideoRecommendations />
        </div>
      </div>
    </Layout>
  );
};

export default Video;
