"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { createNewComment } from "@/actions/comments";
import type { CommentWithRelations } from "@/types";

interface CommentsProps {
  postId: string;
  comments: CommentWithRelations[];
}

export function Comments({ postId, comments }: CommentsProps) {
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Debe iniciar sesión para comentar");
      return;
    }
    setIsLoading(true);
    try {
      const { comment, error, ok, success } = await createNewComment(
        {
          content: newComment,
          authorId: user.id,
        },
        postId
      );
      if (ok) {
        setNewComment("");
        toast.success(success);
      } else {
        toast.error(error);
      }
    } catch (error) {
      toast.error("Error al agregar el comentario");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Comentarios</h3>
      <form onSubmit={handleSubmit} className="space-y-2">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escriba su comentario..."
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Enviando..." : "Comentar"}
        </Button>
      </form>
      {comments && (
        <div className="space-y-4">
          {comments?.map((comment) => (
            <div key={comment.id} className="flex space-x-4">
              <Avatar>
                <AvatarImage src={comment.author.imageUrl || ""} />
                <AvatarFallback>
                  {comment?.author?.name?.[0] || ""}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{comment.author.name}</span>
                  <span className="text-muted-foreground text-sm">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-1 text-sm">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
