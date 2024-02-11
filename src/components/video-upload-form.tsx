import React, { useState } from "react";

import { Button } from "@/components/ui/button";
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Upload } from "lucide-react";

const formSchema = z.object({
  videoSelect: z.any(),
  thumbnail: z.any(),
  title: z.string().min(4, {
    message: "Please enter a title.",
  }),
  description: z.string().min(4, {
    message: "Please enter a description.",
  }),
});

const VideoUploadForm = () => {
  const [dragActive, setDragActive] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoSelect: new File([], ""),
      thumbnail: new File([], ""),
      title: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  // console.log(form.getValues());

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="videoSelect"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Videos</FormLabel>
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
                      form.setValue("videoSelect", e.dataTransfer.files[0]);
                    setDragActive(false);
                  }}
                >
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="text-4xl bg-purple-300 p-4 rounded-full">
                      <Upload className="text-purple-500" size={67} />
                    </div>
                    <p className="text-sm text-gray-400 font-semibold">
                      Drag and drop video files to upload
                    </p>
                    <p>Your videos will be private untill you publish them.</p>
                    <div className="h-10 w-[40%] relative bg-gray-500 mt-2">
                      <label
                        htmlFor="videoUpload"
                        className="flex absolute -top-1 -left-1 bg-purple-500 h-full w-full text-white cursor-pointer hover:bg-purple-600 items-center justify-center"
                      >
                        <p className="text-center text-black font-bold text-lg">
                          Select Files
                        </p>
                        <Input
                          id="videoUpload"
                          type="file"
                          className="rounded-none hidden"
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
          name="videoSelect"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  className="rounded-none"
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
          name="videoSelect"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="This is video description..."
                  className="rounded-none"
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default VideoUploadForm;
