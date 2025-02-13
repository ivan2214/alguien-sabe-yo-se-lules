import type { Comment, Image, Post, User } from "@prisma/client";

export interface PostWithRelations extends Post {
  author: User | null;
  comments: CommentWithRelations[] | null;
  images: Image[] | null;
}

export interface CommentWithRelations extends Comment {
  author: User;
}
