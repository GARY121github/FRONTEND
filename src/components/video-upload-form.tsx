import { useState } from "react";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Upload } from "lucide-react";

const MAX_VIDEO_FILE_SIZE = 500000000; // 50MB
const MAX_THUMBNAIL_FILE_SIZE = 5000000; // 5MB

function checkVideoFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split(".").pop();
    if (
      fileType === "mp4" ||
      fileType === "mov" ||
      fileType === "webm" ||
      fileType === "avi" ||
      fileType === "mkv" ||
      fileType === "flv" ||
      fileType === "wmv"
    ) {
      return true;
    }
  }
  return false;
}

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
  videoFile: z
    .any()
    .refine((file) => file?.length !== 0, "File is required")
    .refine((file) => file.size < MAX_VIDEO_FILE_SIZE, "Max size is 50MB.")
    .refine(
      (file) => checkVideoFileType(file),
      "Only .mp4, .mov, .webm, .avi, .mkv, .flv, .wmv formats are supported."
    ),
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

interface VideoUploadFormProps {
  setStartUpload: (value: boolean) => void;
}

const VideoUploadForm: React.FC<VideoUploadFormProps> = ({
  setStartUpload,
}) => {
  const [dragActive, setDragActive] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoFile: new File([], ""),
      thumbnail: new File([], ""),
      title: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("video uploading started");
      setStartUpload(true);
      const response = await axios.post(
        "http://localhost:8000/api/v1/videos",
        {
          title: values.title,
          description: values.description,
          videoFile: values.videoFile,
          thumbnail: values.thumbnail,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.error(error);
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
          name="videoFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Upload Videos<sup className="text-red-400">*</sup>
              </FormLabel>
              <FormControl>
                <div
                  className={`flex flex-col items-center justify-center w-full h-96 border-4 border-dashed py-[10%] ${
                    dragActive ? "bg-gray-700" : "bg-gray-900"
                  }`}
                  onDragEnter={() => setDragActive(true)}
                  onDragLeave={() => setDragActive(false)}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    dragActive &&
                      form.setValue("videoFile", e.dataTransfer.files[0]);
                    setDragActive(false);
                  }}
                >
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="text-4xl bg-purple-300 p-4 rounded-full">
                      <Upload className="text-purple-500" size={67} />
                    </div>
                    <p className="text-sm text-white font-semibold">
                      Drag and drop video files to upload
                    </p>
                    <p>Your videos will be private untill you publish them.</p>
                    <div className="h-10 w-[40%] relative mt-2">
                      <label htmlFor="videoUpload">
                        <p className="group/btn mr-1 w-full items-center gap-x-2 bg-[#ae7aff] hover:bg-[#9c60fe] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]">
                          {form.watch("videoFile")?.size === 0
                            ? "SELECT VIDEO"
                            : form.watch("videoFile").name}
                        </p>
                        <Input
                          id="videoUpload"
                          type="file"
                          className="hidden"
                          onChange={(e) =>
                            field.onChange(
                              e.target.files ? e.target.files[0] : null
                            )
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Thumbnail<sup className="text-red-400">*</sup>
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  className="w-full h-full border p-1 file:mr-4 file:border-none file:bg-[#ae7aff] file:px-3 file:py-1.5 rounded-none"
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
        <button className="group/btn mr-1 w-full items-center gap-x-2 bg-[#ae7aff] hover:bg-[#9c60fe] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]">
          Upload
        </button>
      </form>
    </Form>
  );
};

export default VideoUploadForm;
