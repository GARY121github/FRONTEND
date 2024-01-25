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
  const { user } = useAuth();

  useEffect(() => {
    // console.log(user);
  }, [user]);
  return (
    <nav className="flex justify-between p-3 border-b-4 ">
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
          <MenubarMenu>
            <MenubarTrigger className="bg-inherit cursor-pointer">
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
        </Menubar>
      </section>
    </nav>
  );
};

export default Navbar;
