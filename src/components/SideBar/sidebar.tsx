import React from "react";
import {
  Home,
  ThumbsUp,
  History,
  Video,
  FolderClosed,
  UserRoundCheck,
  Settings,
  HelpCircle,
} from "lucide-react";
import SideBarItems from "./sidebar-item";
import useAuth from "@/hooks/useAuth";

function SideBar() {
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
      navigation: `/user/${user?.username}`,
    },
    {
      title: "Collections",
      logo: <FolderClosed />,
      navigation: "/collections",
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
    <div className="flex flex-col justify-between p-2 pt-4 pb-4 border h-[90%]">
      <section className="flex flex-col gap-2">
        {topElements.map(
          (element: {
            title: string;
            logo: JSX.Element;
            navigation: string;
          }) => {
            return (
              <SideBarItems
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
}

export default SideBar;
