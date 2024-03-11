import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Loading from "./loading";
import { useToast } from "./ui/use-toast";
import { editVideo } from "@/services/videos.service";

const MAX_THUMBNAIL_FILE_SIZE = 500000000; // 5MB

function checkImageFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split(".").pop();
    if (
      fileType === "jpg" ||
      fileType === "jpeg" ||
      fileType === "png" ||
      fileType === "gif"
    ) {
      return true;
    }
  }
  return false;
}

const formSchema = z.object({
  thumbnail: z
    .any()
    .refine((file) => file?.length !== 0, "File is required")
    .refine((file) => file.size < MAX_THUMBNAIL_FILE_SIZE, "Max size is 5MB.")
    .refine(
      (file) => checkImageFileType(file),
      "Only .jpg, .jpeg, .png, .gif formats are supported."
    ),
  title: z.string().min(4, {
    message: "Please enter a title.",
  }),
  description: z.string().min(4, {
    message: "Please enter a description.",
  }),
});

interface VideoEditFormProps {
  setRefresh: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
  _id: string;
  thumbnail: string;
  title: string;
  description: string;
}

const VideoEditForm: React.FC<VideoEditFormProps> = ({
  setRefresh,
  setIsOpen,
  _id,
  thumbnail,
  title,
  description,
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      thumbnail: new File([], thumbnail),
      title: title,
      description: description,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const response = await editVideo(
        _id,
        values.thumbnail,
        values.title,
        values.description
      );
      console.log(response);
      setRefresh(true);
      setLoading(false);
      setIsOpen(false);
      toast({
        title: "Video Updated",
        description: "Video Updated Successfully!",
        variant: "success",
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Update Failed",
        description: "Video Updating Failed!",
        variant: "destructive",
      });
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 text-white"
      >
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Thumbnail<sup className="text-red-400">*</sup>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="file"
                    className="opacity-0 w-full h-full border p-1 file:mr-4 file:border-none file:bg-[#ae7aff] file:px-3 file:py-1.5 rounded-none absolute"
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                  />
                  {thumbnail && (
                    <img
                      src={
                        field.value.name !== thumbnail
                          ? URL.createObjectURL(field.value)
                          : thumbnail
                      }
                      alt="thumbnail"
                      className="border-4 border-dashed p-2 w-full h-full"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Title<sup className="text-red-400">*</sup>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="This is video title..."
                  className="rounded-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description<sup className="text-red-400">*</sup>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="This is video description..."
                  className="rounded-none focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-0 bg-inherit"
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          className={`group/btn mr-1 w-full items-center gap-x-2 bg-[#ae7aff] hover:bg-[#9c60fe] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] disabled:opacity-50`}
          disabled={loading}
        >
          {loading ? <Loading className="max-h-5" /> : "Submit"}
        </button>
      </form>
    </Form>
  );
};

export default VideoEditForm;
