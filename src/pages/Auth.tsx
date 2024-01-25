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

interface AuthProps {
  login: boolean;
}

function Auth(props : AuthProps) {
  const [login, setLogin] = React.useState(false);

  useEffect(() => {
    setLogin(props.login);
  }, []);

  return (
    <Card className="w-5/12 mx-auto flex flex-col p-2 ">
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
            {login ? "SignUp" : "Login"}
          </span>
        </h5>
      </CardFooter>
    </Card>
  );
}

export default Auth;
