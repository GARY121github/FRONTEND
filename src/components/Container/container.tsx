import  { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

function Container({ children, className }: ContainerProps) {
  return (
    <div className={`h-screen overflow-y-auto min-h-screen ${className}`}>
      {children}
    </div>
  );
}

export default Container;
