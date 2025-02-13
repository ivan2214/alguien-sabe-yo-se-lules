"use client";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Comments } from "@/components/comments";
import { ReportDialog } from "@/components/report-dialog";
import { toast } from "sonner";
import { deletePost } from "@/actions/posts";
import type { PostWithRelations } from "@/types";

export function PublicationList({ posts }: { posts: PostWithRelations[] }) {
  const searchParams = useSearchParams();
  const { user } = useUser();
  const query = searchParams.get("q");
  const category = searchParams.get("category");

  const handleDelete = async (postId: string) => {
    try {
      const response = await deletePost(postId);
      if (response.ok) {
        toast.success(response.success);
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error("Error al eliminar la publicación");
    }
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{post.title}</CardTitle>
                <div className="mt-1 flex space-x-2 text-muted-foreground text-sm">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>
                    {post.isAnonymous ? "Anónimo" : post.author?.name}
                  </span>
                  <span>•</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              {user?.id === post.author?.id && (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(post.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{post.content}</p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="w-full">
              <Comments postId={post.id} comments={post.comments} />
            </div>
            <div className="flex w-full justify-end">
              <ReportDialog postId={post.id} />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
