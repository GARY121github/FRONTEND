import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchUser: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const search = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const onSearch = async () => {
    if (!search.current?.value.trim()) return;

    navigate(`/v/${search.current?.value}`);
  };

  return (
    <div className="flex justify-around items-center border-2 border-slate-700 rounded-lg p-1">
      <Input
        className="border-none outline-none focus-visible:ring-0 shadow-none text-blue-100"
        type="text"
        placeholder="search..."
        ref={search}
      />
      <Button className="bg-[#0A1217] hover:bg-slate-700" onClick={onSearch}>
        <Search className="cursor-pointer" />
      </Button>
    </div>
  );
};

export default SearchUser;
