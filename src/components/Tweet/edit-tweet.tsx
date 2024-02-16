import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";

const FormSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, { message: "Tweet should contain at least one character" }),
});

interface EditTweetProps {
  tweetId: string;
  text: string;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditTweet: React.FC<EditTweetProps> = ({
  tweetId,
  text,
  setRerender,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: text,
    },
  });

  const editTweet = async (data: z.infer<typeof FormSchema>) => {
    try {
      if (data.content === text) {
        toast({
          variant: "destructive",
          title: "Tweet not edited",
          description: "You need to make changes to the tweet to edit it.",
        });
        return;
      }
      console.log(data);
      const response = await axios.patch(
        `http://localhost:8000/api/v1/tweets/${tweetId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response);
      setRerender(true);
      toast({
        variant: "success",
        title: "Tweet edited successfully",
        description: "Your tweet has been edited successfully",
      });
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {}, [setRerender]);

  return (
    <Dialog >
      <DialogTrigger className="flex w-full items-center justify-between">
        <h2>Edit</h2>
        <Pencil size={15} />
      </DialogTrigger>
      <DialogContent className="bg-slate-400 w-96 p-4 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-center">EDIT TWEET</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(editTweet)}
                className="w-full space-y-6 p-2 relative"
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Write a tweet..."
                          className="resize-none text-black bg-white rounded-md p-4 w-full h-24 text-md focus:outline-blue-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogClose asChild>
                  <Button
                    className="absolute top-10 right-4 bg-green-600 hover:bg-green-500"
                    type="submit"
                  >
                    Edit
                  </Button>
                </DialogClose>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditTweet;
