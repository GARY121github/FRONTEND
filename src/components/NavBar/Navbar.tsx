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
    <header className={cn("sticky top-0 border-b-2 bg-white z-10", className)}>
      <nav className="flex justify-between p-3">
        <section className="basis-[25%] w-full  flex justify-start items-center">
          <Button className="bg-inherit hover:bg-slate-200 shadow-none">
            <AlignJustify className="text-black" />
          </Button>
        </section>
        <section className="basis-[50%] mx-[15%] w-full">
          <Search />
        </section>
        <section className="basis-[25%] w-full">
          <Menubar className="flex justify-end border-none shadow-none">
            {isAuthenticated ? (
              <MenubarMenu>
                <MenubarTrigger className="bg-inherit cursor-pointer rounded-full p-0">
                  <Avatar>
                    <AvatarImage
                      src={user?.avatar || "https://github.com/shadcn.png"}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem className="flex justify-between cursor-pointer">
                    Profile <CircleUserRound />
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Logout />
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            ) : (
              <MenubarMenu>
                <Link to="/login">
                  <Button className="bg-inherit text-black shadow-none hover:bg-inherit hover:text-slate-600">
                    Sign in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="rounded-full bg-blue-400 hover:bg-blue-500">
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
