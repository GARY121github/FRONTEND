import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

function Container({ children }: ContainerProps) {
  return (
    <div className="h-screen overflow-y-auto min-h-screen">
      {children}
    </div>
  );
}

export default Container;
