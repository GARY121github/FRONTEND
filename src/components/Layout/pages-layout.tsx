import React from "react";
import Container from "@/components/Container/container";
import Sidebar from "@/components/SideBar/sidebar";
import Navbar from "@/components/NavBar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <Container>
            <Navbar />
            <div className="flex h-dvh">
                <section className="basis-[15%] fixed h-full w-[15%] bg-slate-400 border-r-2">
                    <Sidebar />
                </section>
                <section className="bg-slate-600 overflow-auto ml-[15%] basis-[85%]">{children}</section>
            </div>
        </Container>
    );
};


export default Layout;
