import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

interface SideBarItemsProps {
  title: string;
  logo: ReactElement;
  navigation: string;
}

const SideBarItems: React.FC<SideBarItemsProps> = ({
  title,
  logo,
  navigation,
}: SideBarItemsProps) => {
  return (
    <Link to={navigation}>
      <div className="flex justify-start gap-3 p-2 px-8 hover:bg-slate-500 cursor-pointer text-blue-100">
        {logo}
        {title}
      </div>
    </Link>
  );
};

export default SideBarItems;
