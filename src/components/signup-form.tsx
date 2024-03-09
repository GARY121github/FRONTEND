import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerUserService } from "@/services/user.service.ts";

const formSchema = z.object({
  username: z.string().trim().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  email: z.string().email(),
  fullName: z.string().trim().min(4, {
    message: "Full name must be at least 4 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  avatar: z.instanceof(File, {
    message: "Please upload avatar image.",
  }),
  coverImage: z.instanceof(File).optional(),
});

function SignUpFrom() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      fullName: "",
      password: "",
      avatar: new File([], ""),
      coverImage: new File([], ""),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      // Call the registerUserService to register the user
      const response = await registerUserService(values);

      // Extract necessary data from the response
      const { user, accessToken, refreshToken } = response;

      // Store access token and refresh token in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Call login function with the user data
      login(user);

      // Show success toast
      toast({
        title: "Registration Successful",
        description: "User registered successfully.",
        duration: 5000, // Optional: specify toast duration
      });

      // Redirect to home page
      navigate("/");
    } catch (error) {
      // Handle error
      console.error("Error registering user:", error);

      // Show error toast
      toast({
        title: "Registration Failed",
        description: "Failed to register user. Please try again.",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        encType="multipart/form-data"
      >
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
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="gary stark" {...field} />
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
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <Input
                  accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
                  type="file"
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <Input
                  accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
                  type="file"
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          SignUp
        </Button>
      </form>
    </Form>
  );
}

export default SignUpFrom;
