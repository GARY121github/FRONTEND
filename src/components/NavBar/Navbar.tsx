import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { LogOut, CircleUserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Search from "@/components/search";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";

const Navbar: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // console.log(user);
  }, [user]);
  return (
    <header className="sticky top-0 border-b-2 bg-white z-10">
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
            {
              isAuthenticated ? (
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
                  <MenubarItem className="flex justify-between cursor-pointer">
                    Logout <LogOut />
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              ) : (
                <MenubarMenu>
                  <Button className="bg-inherit text-black shadow-none hover:bg-inherit hover:text-slate-600">Sign in</Button>
                  <Button className="rounded-full bg-blue-400 hover:bg-blue-500">Get Started</Button>
                </MenubarMenu>
              )
            }
          </Menubar>
        </section>
      </nav>
    </header>
  );
};

export default Navbar;
