import React from "react";

interface DashboardCardProps {
  icon: JSX.Element;
  title: string;
  value: number;
  className?: string;
}
const DashboardCard: React.FC<DashboardCardProps> = ({
  icon,
  title,
  value,
  className,
}) => {
  return (
    <div className={`flex flex-col gap-2 border p-4 border-white ${className}`}>
      {
        icon
      }
      <h4 className="text-white text-xl font-semibold">{title}</h4>
      <h1 className="text-white text-3xl">{value}</h1>
    </div>
  );
};

export default DashboardCard;
