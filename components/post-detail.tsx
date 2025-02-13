import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PostWithRelations } from "@/types";
import { Flag } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { ReactionButton } from "./reaction-button";

interface PostDetailProps {
  post: PostWithRelations;
}

export const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  const { title, content, author, category, images, reactions, comments } =
    post;

  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={author?.imageUrl || "/placeholder.svg"}
                alt={author?.name || "User"}
              />
              <AvatarFallback>{author?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-bold text-xl">{author?.name}</h2>
              <Badge variant="category">{category}</Badge>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Flag className="mr-2 h-4 w-4" />
            Report
          </Button>
        </div>

        <h1 className="mb-4 font-bold text-3xl">{title}</h1>
        <p className="mb-6 text-gray-700">{content}</p>

        {images && images.length > 0 && (
          <div className="mb-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {images.slice(0, 9).map((image, index) => (
                <div key={image.id} className="relative aspect-square">
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={`Post image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              ))}
              {images.length > 9 && (
                <div className="relative flex aspect-square items-center justify-center rounded-lg bg-gray-200">
                  <span className="font-bold text-2xl text-gray-600">
                    +{images.length - 9}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mb-6 flex space-x-4">
          {reactions?.map((reaction) => (
            <ReactionButton
              key={reaction.id}
              type={reaction.type}
              count={reaction.post?.reactionCount || 0}
            />
          ))}
        </div>

        <div className="border-t pt-6">
          <h3 className="mb-4 font-bold text-xl">Comments</h3>
          {comments?.map((comment) => (
            <div key={comment.id} className="mb-4">
              <div className="mb-2 flex items-center space-x-2">
                <Avatar>
                  <AvatarImage
                    src={comment.author.imageUrl || ""}
                    alt={comment.author.name || ""}
                  />
                  <AvatarFallback>
                    {comment?.author?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{comment.author.name}</h4>
                  <span className="text-gray-500 text-sm">
                    {comment.createdAt.toLocaleString()}
                  </span>
                </div>
              </div>
              <p className="ml-10 text-gray-700">{comment.content}</p>
              <div className="mt-2 ml-10 flex space-x-2">
                {comment?.reactions?.map((reaction) => (
                  <ReactionButton
                    key={reaction.id}
                    type={reaction.type}
                    count={reaction.comment?.reactionCount || 0}
                    commentId={comment.id}
                    isComment
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
