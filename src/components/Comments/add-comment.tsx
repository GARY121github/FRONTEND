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
import { useCallback, useEffect } from "react";
import { addComment } from "@/services/comment.service";

const FormSchema = z.object({
  content: z.string().trim().min(1, {
    message: "Comment cannot be empty",
  }),
});

interface AddCommentProps {
  videoId: string;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddComment: React.FC<AddCommentProps> = ({ videoId, setRerender }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
    },
  });

  const addCommentHandler = useCallback(
    async (data: z.infer<typeof FormSchema>) => {
      try {
        await addComment(videoId, data.content);
        setRerender((prev) => !prev);
        toast({
          variant: "success",
          title: "Comment added",
          description: "Your comment has been added successfully",
        });
        form.reset();
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  useEffect(() => {}, [addComment, setRerender]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(addCommentHandler)}
        className="w-full space-y-6 p-2 relative"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Write a comment..."
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

export default AddComment;
