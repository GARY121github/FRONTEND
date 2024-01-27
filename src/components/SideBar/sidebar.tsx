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

function sidebar() {
  const topElements: Array<{ title: string; logo: JSX.Element }> = [
    {
      title: "Home",
      logo: <Home />,
    },
    {
      title: "Liked Videos",
      logo: <ThumbsUp />,
    },
    {
      title: "History",
      logo: <History />,
    },
    {
      title: "My Content",
      logo: <Video />,
    },
    {
      title: "Collections",
      logo: <FolderClosed />,
    },
    {
      title: "Subscribers",
      logo: <UserRoundCheck />,
    },
  ];

  const bottomElements: Array<{ title: string; logo: JSX.Element }> = [
    {
      title: "Support",
      logo: <HelpCircle />,
    },
    {
      title: "Setting",
      logo: <Settings />,
    },
  ];
  return (
    <div className="flex flex-col justify-between p-2 pt-4 pb-4 border h-[90%]">
      <section className="flex flex-col gap-2">
        {topElements.map((element: { title: string; logo: JSX.Element }) => {
          return <SideBarItems title={element.title} logo={element.logo} />;
        })}
      </section>
      <section className="flex flex-col gap-2">
        {bottomElements.map((element: { title: string; logo: JSX.Element }) => {
          return <SideBarItems title={element.title} logo={element.logo} />;
        })}
      </section>
    </div>
  );
}

export default sidebar;
