import useAuth from "@/hooks/useAuth";
import { LogOut } from "lucide-react";
import { logoutUser } from "@/services/user.service.ts";
import { useToast } from "./ui/use-toast";

const Logout = () => {
  const { logout } = useAuth();
  const { toast } = useToast();
  const logoutUserHandler = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("accessToken");
      logout();
      toast({
        variant: "success",
        title: "Logged out successfully",
        description: "You have been logged out",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to logout",
      });
    }
  };

  return (
    <div
      onClick={logoutUserHandler}
      className="flex justify-between cursor-pointer w-full"
    >
      Logout <LogOut />
    </div>
  );
};

export default Logout;
