"use client";

import type { PostWithRelations } from "@/types";
import { PostCard } from "./post-card";

export function PublicationList({ posts }: { posts: PostWithRelations[] }) {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{posts.map((post) => (
				<PostCard key={post.id} post={post} />
			))}
		</div>
	);
}
