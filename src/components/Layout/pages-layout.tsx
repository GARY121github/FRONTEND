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
    <Container className="min-h-screen">
      <Navbar className="min-h-16 h-[10%]" />
      <div className="grid grid-cols-12 h-[90%]">
        <section className="col-span-2 h-full bg-slate-400 border-r-2 hidden lg:flex overflow-y-auto">
          <Sidebar className="hidden lg:flex" />
        </section>
        <section
          className={`bg-slate-600 col-span-12 lg:col-span-10 overflow-y-auto ${className}`}
        >
          {children}
        </section>
      </div>
    </Container>
  );
};

export default Layout;
