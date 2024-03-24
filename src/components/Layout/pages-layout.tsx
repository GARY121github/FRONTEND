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
      <Navbar className="min-h-16 h-[10%] border-b border-slate-700" />
      <div className="grid grid-cols-12 h-[90%]">
        <section className="col-span-2 h-full bg-[#0E1217] hidden lg:flex overflow-y-auto">
          <Sidebar className="hidden lg:flex border-r border-slate-700" />
        </section>
        <section
          className={`bg-gradient-to-b from-[#0E1217] via-[#0F1217] to-[#0E1217] col-span-12 lg:col-span-10 overflow-y-auto ${className}`}
        >
          {children}
        </section>
      </div>
    </Container>
  );
};

export default Layout;
