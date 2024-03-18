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
import { deleteComment } from "@/services/comment.service.ts";

interface DeleteCommentProps {
  commentId: string;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeleteComment: React.FC<DeleteCommentProps> = ({
  commentId,
  setRerender,
}) => {
  const { toast } = useToast();
  const deleteCommentHandler = async () => {
    try {
      await deleteComment(commentId);
      setRerender(true);
      toast({
        variant: "success",
        title: "Comment deleted",
        description: "Comment deleted successfully",
      });
    } catch (error) {
       toast({
         variant: "destructive",
         title: "Deletion Failed",
         description: "Comment Deletion Failed!",
       });
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
            Are you sure you want to delete this comment?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={deleteCommentHandler}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteComment;
