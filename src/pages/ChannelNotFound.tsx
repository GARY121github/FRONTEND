import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ChannelNotFound = () => {
  return (
    <div className="grid h-screen place-items-center">
      <img
        className="h-96"
        src="https://static.vecteezy.com/system/resources/thumbnails/023/755/487/original/morning-fishing-404-error-animation-animated-fisherman-with-spinning-empty-state-4k-concept-footage-with-alpha-channel-transparency-colorful-page-not-found-flash-message-for-ui-ux-web-design-video.jpg"
      />
      <Link to="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
};

export default ChannelNotFound;
