import type { Comment, Post, User } from "@prisma/client";

export interface PostWithRelations extends Post {
  author: User | null;
  comments: CommentWithRelations[];
}

export interface CommentWithRelations extends Comment {
  author: User;
}
