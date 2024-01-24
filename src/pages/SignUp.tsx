import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import SignUpFrom from "@/components/signup-form";

function SignUp() {
  return (
    <Card className="w-5/12 mx-auto flex flex-col p-2">
      <CardHeader>
        <CardTitle className="text-center text-3xl">SignUp</CardTitle>
        <CardDescription className="text-center">Create a new Account</CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpFrom />
      </CardContent>
      <CardFooter>
        <h5 className="text-center">Already have an account ? <span className="font-bold">Login</span></h5>
      </CardFooter>
    </Card>
  );
}

export default SignUp;
