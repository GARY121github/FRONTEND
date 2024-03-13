import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { CircleUserRound, AlignJustify } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Search from "@/components/search";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import Logout from "@/components/logout";
import { cn } from "@/lib/utils";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {}, [user, isAuthenticated]);
  return (
    <header
      className={cn("sticky top-0 border-b-2 bg-[#0A1217] z-10", className)}
    >
      <nav className="flex justify-between p-3 items-center">
        <section className="basis-[25%] w-full flex justify-start items-center">
          <Button className="bg-inherit hover:bg-slate-700 shadow-none">
            <AlignJustify className="text-blue-100" />
          </Button>
        </section>
        <section className="basis-[50%] mx-[15%] w-full">
          <Search />
        </section>
        <section className="basis-[25%]">
          <Menubar className="bg-inherit justify-end border-none shadow-none">
            {isAuthenticated ? (
              <MenubarMenu>
                <MenubarTrigger className="cursor-pointer rounded-full p-0 border">
                  <Avatar>
                    <AvatarImage
                      src={user?.avatar || "https://github.com/shadcn.png"}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </MenubarTrigger>
                <MenubarContent className="bg-[#0A1217] border-slate-700">
                  <Link to="/dashboard">
                    <MenubarItem className="flex justify-between cursor-pointer text-blue-100 focus:bg-inherit focus:opacity-60 focus:text-blue-100">
                      Profile <CircleUserRound />
                    </MenubarItem>
                  </Link>

                  <MenubarSeparator className="bg-slate-700" />
                  <MenubarItem className="flex justify-between cursor-pointer text-blue-100 w-full focus:bg-inherit focus:opacity-60 focus:text-blue-100">
                    <Logout />
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            ) : (
              <MenubarMenu>
                <Link to="/login">
                  <Button className="bg-inherit text-blue-100 shadow-none hover:bg-inherit hover:opacity-60">
                    Sign in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="rounded-full bg-slate-700 hover:opacity-70">
                    Get Started
                  </Button>
                </Link>
              </MenubarMenu>
            )}
          </Menubar>
        </section>
      </nav>
    </header>
  );
};

export default Navbar;
