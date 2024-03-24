import React, { useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";

interface ProtectedProps {
  children: ReactNode;
  authentication?: boolean;
}

const Protected: React.FC<ProtectedProps> = ({
  children,
  authentication = true,
}) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!authentication && isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Unauthorized",
        description: "You are already logged-in.",
      });
      navigate("/");
    } else if (authentication && !isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Unauthorized",
        description: "You need to login first to access this page.",
      });
      navigate("/login");
    }
    setLoader(false);
  }, [isAuthenticated]);

  return loader ? <h1>loading...</h1> : <>{children}</>;
};

export default Protected;
