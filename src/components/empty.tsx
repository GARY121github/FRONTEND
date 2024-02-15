import React from "react";
interface EmptyProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const Empty: React.FC<EmptyProps> = ({
  icon,
  title,
  description,
  className = "",
}) => {
  return (
    <div
      className={`flex justify-center items-center flex-col space-y-2 my-auto mx-auto h-96 max-w-sm ${className}`}
    >
      {icon}

      <h1 className="text-2xl text-white font-semibold">{title}</h1>
      <p className="text-white text-center">{description}</p>
    </div>
  );
};

export default Empty;
