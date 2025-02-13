"use client";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { PostWithRelations } from "@/types";
import Link from "next/link";
import { ReactionButton } from "./reaction-button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

interface PostCardProps {
	post: PostWithRelations;
}

export function PostCard({ post }: PostCardProps) {
	const [currentImage, setCurrentImage] = useState(0);

	const nextImage = () => {
		setCurrentImage((prev) => (prev + 1) % (post?.images?.length || 1));
	};

	const prevImage = () => {
		setCurrentImage(
			(prev) =>
				(prev - 1 + (post?.images?.length || 1)) % (post?.images?.length || 1),
		);
	};

	return (
		<Card className="flex flex-col justify-between">
			<CardHeader>
				<Link
					className="line-clamp-2 font-bold hover:underline"
					href={`/post/${post.id}`}
				>
					<h2>{post.title}</h2>
				</Link>
			</CardHeader>

			<CardContent className="space-y-3 ">
				<section className="flex items-center">
					<Avatar className="mr-2 h-8 w-8">
						<AvatarImage
							src={post.author?.imageUrl || "/placeholder.svg"}
							alt={post.author?.name || "User"}
						/>
						<AvatarFallback>{post.author?.name?.[0].charAt(0)}</AvatarFallback>
					</Avatar>
					<div className="flex flex-col items-start">
						<span className="font-semibold">{post.author?.name}</span>
						<span className="text-muted-foreground text-sm">
							{format(new Date(post.createdAt), "d 'de' MMMM, yyyy", {
								locale: es,
							})}
						</span>
					</div>
				</section>
				<p className="line-clamp-3 text-muted-foreground text-xs">
					{post.content}
				</p>
				{post.images && post.images.length > 0 && (
					<div className="relative h-48">
						<img
							src={post.images[currentImage].url || "/placeholder.svg"}
							alt={`Imagen ${currentImage + 1} de la publicación`}
							className="aspect-square h-full w-full rounded object-cover object-center"
						/>

						{post.images.length > 1 && (
							<>
								<Button
									variant="ghost"
									size="icon"
									className="-translate-y-1/2 absolute top-1/2 left-2 transform"
									onClick={prevImage}
								>
									<ChevronLeft className="h-6 w-6" />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									className="-translate-y-1/2 absolute top-1/2 right-2 transform"
									onClick={nextImage}
								>
									<ChevronRight className="h-6 w-6" />
								</Button>
							</>
						)}
						<div className="absolute right-2 bottom-2 rounded-full bg-black bg-opacity-50 px-2 py-1 text-white text-xs">
							{currentImage + 1} / {post.images.length}
						</div>
					</div>
				)}
			</CardContent>

			<CardFooter>
				<div className="flex items-center justify-between">
					<div className="flex flex-wrap justify-between gap-2">
						<ReactionButton type="like" count={post.reactions?.length || 0} />
						<ReactionButton type="love" count={post.reactions?.length || 0} />
						<ReactionButton type="angry" count={post.reactions?.length || 0} />
						<ReactionButton type="haha" count={post.reactions?.length || 0} />
					</div>
				</div>
			</CardFooter>
		</Card>
	);
}
