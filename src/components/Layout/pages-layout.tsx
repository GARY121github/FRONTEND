import React from "react";
import Container from "@/components/Container/container";
import Sidebar from "@/components/SideBar/sidebar";
import Navbar from "@/components/NavBar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <Container className="min-h-screen grid grid-rows-11">
      <Navbar className="md:row-span-1 row-span-2" />
      <div className="flex row-span-10">
        <section className="sticky top-0 w-[15%] h-full bg-slate-400 border-r-2 z-100 hidden lg:flex lg:basis-[15%]">
          <Sidebar className="hidden lg:flex" />
        </section>
        <section
          className={`bg-slate-500 overflow-y-auto lg:basis-[85%] ${className}`}
        >
          {children}
        </section>
      </div>
    </Container>
  );
};

export default Layout;
