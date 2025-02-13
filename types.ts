import type { Comment, Image, Post, Reaction, User } from "@prisma/client";

export interface ReactionWithRelations extends Reaction {
	post: Post | null; // Asegúrate de que la relación post esté bien representada
	comment: Comment | null; // Asegúrate de que la relación comment esté bien representada
}

export interface CommentWithRelations extends Comment {
	author: User;
	reactions: ReactionWithRelations[] | null;
}

export interface PostWithRelations extends Post {
	author: User | null;
	comments: CommentWithRelations[] | null;
	images: Image[] | null;
	reactions: ReactionWithRelations[] | null;
}
