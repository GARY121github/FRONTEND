import React from "react";
import {
  Home,
  ThumbsUp,
  History,
  Video,
  UserRoundCheck,
  Settings,
  HelpCircle,
} from "lucide-react";
import SideBarItems from "./sidebar-item";
import useAuth from "@/hooks/useAuth";

interface SideBarProps {
  className?: string;
}

const SideBar: React.FC<SideBarProps> = ({ className }) => {
  const { user } = useAuth();

  const topElements: Array<{
    title: string;
    logo: JSX.Element;
    navigation: string;
  }> = [
    {
      title: "Home",
      logo: <Home />,
      navigation: "/",
    },
    {
      title: "Liked Videos",
      logo: <ThumbsUp />,
      navigation: "/liked-videos",
    },
    {
      title: "History",
      logo: <History />,
      navigation: "/history",
    },
    {
      title: "My Content",
      logo: <Video />,
      navigation: `/@${user?.username}`,
    },
    {
      title: "Subscribers",
      logo: <UserRoundCheck />,
      navigation: "/subscribers",
    },
  ];

  const bottomElements: Array<{
    title: string;
    logo: JSX.Element;
    navigation: string;
  }> = [
    {
      title: "Support",
      logo: <HelpCircle />,
      navigation: "/support",
    },
    {
      title: "Setting",
      logo: <Settings />,
      navigation: "/settings",
    },
  ];
  return (
    <div
      className={`flex flex-col w-full justify-between py-4 h-full ${className}`}
    >
      <section className="flex flex-col gap-2">
        {topElements.map(
          (element: {
            title: string;
            logo: JSX.Element;
            navigation: string;
          }) => {
            return (
              <SideBarItems
                key={element.title}
                title={element.title}
                logo={element.logo}
                navigation={element.navigation}
              />
            );
          }
        )}
      </section>
      <section className="flex flex-col gap-2">
        {bottomElements.map(
          (element: {
            title: string;
            logo: JSX.Element;
            navigation: string;
          }) => {
            return (
              <SideBarItems
                key={element.title}
                title={element.title}
                logo={element.logo}
                navigation={element.navigation}
              />
            );
          }
        )}
      </section>
    </div>
  );
};

export default SideBar;
