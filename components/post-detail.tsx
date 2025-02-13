"use client";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Comments } from "./comments";
import { ReportDialog } from "./report-dialog";
import type { PostWithRelations } from "@/types";

interface PostDetailProps {
  post: PostWithRelations;
}

export function PostDetail({ post }: PostDetailProps) {
  return (
    <Card>
      <CardHeader className="p-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={post.author?.imageUrl || ""} />
            <AvatarFallback>{post.author?.name?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">
              {post.isAnonymous ? "Anónimo" : post.author?.name}
            </p>
            <p className="text-muted-foreground text-sm">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h1 className="mb-4 font-bold text-2xl">{post.title}</h1>
        {post?.images && post.images.length > 0 && (
          <div className="mb-4 flex space-x-2 overflow-x-auto">
            {post.images?.map((image, index) => (
              <div key={image.url} className="relative h-64 w-64 flex-shrink-0">
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={`Imagen ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            ))}
          </div>
        )}
        <p className="text-muted-foreground">{post.content}</p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 p-4">
        <div className="flex w-full items-center justify-between">
          <span className="font-medium text-sm">{post.category}</span>
          <ReportDialog postId={post.id} />
        </div>
        <Comments postId={post.id} comments={post.comments} />
      </CardFooter>
    </Card>
  );
}
