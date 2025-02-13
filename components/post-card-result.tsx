import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import type { PostWithRelations } from "@/types";
import type { Image } from "@prisma/client";
import { ImageIcon } from "lucide-react";
import Link from "next/link";

interface PostCardProps {
	post: PostWithRelations;
	handleSearch?: (e: string) => void;
}

const ImageGrid: React.FC<{ images?: Image[] | null }> = ({ images }) => {
	if (!images || images.length === 0) return null;

	if (images.length === 1) {
		return (
			<div className="h-24 w-24 overflow-hidden rounded">
				<img
					src={images[0].url || "/placeholder.svg?height=96&width=96"}
					alt="Content"
					className="h-full w-full object-cover"
				/>
			</div>
		);
	}

	return (
		<div className="grid h-24 w-24 grid-cols-2 place-items-center gap-1 overflow-hidden">
			{images.slice(0, 4).map((img, index) => (
				<div key={img.id} className="relative mx-auto h-full w-full">
					<img
						src={img.url || "/placeholder.svg?height=48&width=48"}
						alt={`Content ${index + 1}`}
						className="h-full max-h-[48px] w-full max-w-[48px] rounded object-cover object-center"
					/>
					{index === 3 && images.length > 4 && (
						<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-sm text-white">
							+{images.length - 3}
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export function PostCardResult({ post, handleSearch }: PostCardProps) {
	const { author, content, images, title } = post;

	const authorInitial =
		author?.name && author.name.length > 0 ? author.name.charAt(0) : "?";

	return (
		<Card className="w-full max-w-2xl">
			<CardContent className="p-4">
				<div className="flex items-center justify-between">
					<section className="flex flex-1 flex-col items-start gap-2">
						<section className="flex items-center space-x-4">
							<Avatar className="h-12 w-12">
								<AvatarImage
									src={author?.imageUrl || "/placeholder.svg"}
									alt={author?.name || "User"}
								/>
								<AvatarFallback>{authorInitial}</AvatarFallback>
							</Avatar>
							<section className="flex flex-col items-start gap-2 pr-10">
								<Link
									onClick={() => {
										handleSearch?.("");
									}}
									className="line-clamp-2 font-bold hover:underline"
									href={`/post/${post.id}`}
								>
									<h2>{title || "No title available"}</h2>
								</Link>
								<h3 className="line-clamp-1 font-normal text-gray-500 text-xs">
									Author: {author?.name || "Unknown Author"}
								</h3>
							</section>
						</section>
						<section className="pr-10">
							<p className="line-clamp-4 text-gray-500 text-sm">
								{content || "No content available"}
							</p>
						</section>
					</section>
					<section>
						{images && images.length > 0 ? (
							<ImageGrid images={images} />
						) : (
							<div className="flex h-24 w-24 items-center justify-center rounded bg-gray-100">
								<ImageIcon className="h-8 w-8 text-gray-400" />
							</div>
						)}
					</section>
				</div>
			</CardContent>
		</Card>
	);
}
