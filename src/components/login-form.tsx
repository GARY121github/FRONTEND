import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import useAuth from "@/hooks/useAuth";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { loginService } from "@/services/user.service.ts";

// username, email, password
const formSchema = z.object({
  username: z.string().trim().min(4, {
    message: "Please enter your username.",
  }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Please enter your password.",
  }),
});

function LoginForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigator = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await loginService(
        values.username,
        values.password,
        values.email
      );
      
      login(response.user);
      const accessToken = response.accessToken;
      const refreshToken = response.refreshToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      toast({
        title: "Login Successfully",
        description: response.message,
      });
      setLoading(false);
      navigator("/");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="gary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="gary121@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Login
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
