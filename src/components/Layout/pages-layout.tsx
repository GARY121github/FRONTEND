import React from "react";
import Container from "@/components/Container/container";
import Sidebar from "@/components/SideBar/sidebar";
import Navbar from "@/components/NavBar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
      <Container className={"max-h-[90vh]"}>
        <Navbar />
        <div className="flex h-dvh">
          <section className="sticky top-0 w-[15%] h-full bg-slate-400 border-r-2 z-100 hidden lg:flex lg:basis-[15%]">
            <Sidebar className={"hidden lg:flex"} />
          </section>
          <section className="bg-slate-600 overflow-y-auto lg:basis-[85%]">
            {children}
          </section>
        </div>
      </Container>
    );
};


export default Layout;
