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
import { useCallback, useEffect } from "react";

const FormSchema = z.object({
  content: z.string().trim().min(1, {
    message: "Tweet cannot be empty",
  }),
});

interface AddTweetProps {
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTweet: React.FC<AddTweetProps> = ({ setRerender }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
    },
  });

  const addTweet = useCallback(async (data: z.infer<typeof FormSchema>) => {
    try {
      console.log(data);
      await axios.post("http://localhost:8000/api/v1/tweets", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setRerender(true);
      toast({
        variant: "success",
        title: "Tweet added",
        description: "Your tweet has been added successfully",
      });
      form.reset();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {}, [addTweet, setRerender]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(addTweet)}
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
        <Button
          className="absolute top-10 right-4 bg-green-600 hover:bg-green-500"
          type="submit"
        >
          Add
        </Button>
      </form>
    </Form>
  );
};

export default AddTweet;
