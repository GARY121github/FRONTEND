import React, { useEffect } from "react";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { deleteTweet } from "@/services/tweet.service.ts";

interface DeleteTweetProps {
  tweetId: string;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeleteTweet: React.FC<DeleteTweetProps> = ({ tweetId, setRerender }) => {
  const { toast } = useToast();
  const deleteTweetHandler = async () => {
    try {
      await deleteTweet(tweetId);
      setRerender(true);
      toast({
        variant: "success",
        title: "Tweet deleted",
        description: "Tweet deleted successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [setRerender]);

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex w-full items-center justify-between">
        <h2>Delete</h2>
        <Trash2 size={15} />
      </AlertDialogTrigger>
      <AlertDialogContent className="flex items-center">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center ">
            Are you sure you want to delete this tweet?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={deleteTweetHandler}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTweet;
