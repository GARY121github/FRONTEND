import React, { ReactElement } from "react";

interface SideBarItemsProps {
  title: string;
  logo: ReactElement;
}

const SideBarItems: React.FC<SideBarItemsProps> = ({
  title,
  logo,
}: SideBarItemsProps) => {
  return (
    <div className="flex justify-start gap-3 border p-2 hover:bg-slate-300 cursor-pointer">
      {logo}
      {title}
    </div>
  );
};

export default SideBarItems;
