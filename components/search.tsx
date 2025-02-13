"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import { useDebounce } from "@/hooks/use-debounce";
import type { PostWithRelations } from "@/types";
import { PostCardResult } from "./post-card-result";
import { Input } from "./ui/input";

interface SearchProps {
	posts: PostWithRelations[];
}

export function Search({ posts }: SearchProps) {
	const [query, setQuery] = useState("");
	const debouncedQuery = useDebounce(query, 300);

	const filteredPosts = useMemo(() => {
		if (!debouncedQuery) return [];
		return posts.filter(
			(post) =>
				post.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
				post.content.toLowerCase().includes(debouncedQuery.toLowerCase()),
		);
	}, [posts, debouncedQuery]);

	const handleSearch = (e: string) => {
		setQuery(e);
	};

	return (
		<div className="relative w-full max-w-lg">
			<Input
				type="text"
				placeholder="Search posts..."
				value={query}
				onChange={(e) => handleSearch(e.target.value)}
				className="w-full rounded-md border p-2"
			/>
			<AnimatePresence>
				{filteredPosts.length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className="absolute z-10 mt-2 w-full rounded-md border bg-white shadow-lg"
					>
						<div className="flex max-h-[300px] flex-col space-y-4 overflow-y-scroll p-4">
							{filteredPosts.map((post) => (
								<PostCardResult
									handleSearch={handleSearch}
									key={post.id}
									post={post}
								/>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
