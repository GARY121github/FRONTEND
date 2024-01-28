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
      <div className="flex justify-start gap-3 border p-2 hover:bg-slate-300 cursor-pointer">
        {logo}
        {title}
      </div>
    </Link>
  );
};

export default SideBarItems;
