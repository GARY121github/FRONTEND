import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect } from "react";
import SignUpFrom from "@/components/signup-form";
import LoginForm from "@/components/login-form";
import { Link } from "react-router-dom";

interface AuthProps {
  login: boolean;
}

function Auth(props: AuthProps) {
  const [login, setLogin] = React.useState(false);

  useEffect(() => {
    setLogin(props.login);
  }, []);

  return (
    <Card className="flex flex-col w-8/12 mx-auto h-screen items-center justify-center">
      <CardHeader>
        <CardTitle className="text-center text-3xl">
          {login ? "LogIn" : "SignUp"}
        </CardTitle>
      </CardHeader>
      <CardContent>{login ? <LoginForm /> : <SignUpFrom />}</CardContent>
      <CardFooter>
        <h5 className="block text-center">
          {login ? "Didn't have an account ?" : "Already have an account ?"}{" "}
          <span
            onClick={() => {
              setLogin(!login);
            }}
            className="font-bold cursor-pointer hover:text-slate-600"
          >
            {
            login ? 
            <Link to="/register">
            SignUp
            </Link>
            : 
            <Link to="/login">
            Login
            </Link>
            }
          </span>
        </h5>
      </CardFooter>
    </Card>
  );
}

export default Auth;
