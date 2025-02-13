import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { PostWithRelations } from "@/types";

interface PostCardProps {
  post: PostWithRelations;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden">
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
      {post.images && post.images.length > 0 && (
        <div className="relative h-48">
          <Image
            src={post.images?.[0].url || "/placeholder.svg"}
            alt={post.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      <CardContent className="p-4">
        <h3 className="mb-2 font-bold text-lg">{post.title}</h3>
        <p className="line-clamp-3 text-muted-foreground">{post.content}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4">
        <span className="font-medium text-sm">{post.category}</span>
        <Link href={`/post/${post.id}`} passHref>
          <Button variant="outline" size="sm">
            Ver más
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
