"use client";
import { Button } from "@/components/ui/button";
import type { TypeReaction } from "@prisma/client";
import { Angry, Heart, Laugh, ThumbsUp } from "lucide-react";
import type React from "react";

interface ReactionButtonProps {
	type: TypeReaction;
	count: number;
	commentId?: string;
	isComment?: boolean;
}

export const ReactionButton: React.FC<ReactionButtonProps> = ({
	type,
	count,

	commentId,
	isComment,
}) => {
	const getIcon = () => {
		switch (type) {
			case "like":
				return <ThumbsUp className="mr-2 h-4 w-4" />;
			case "love":
				return <Heart className="mr-2 h-4 w-4" />;
			case "haha":
				return <Laugh className="mr-2 h-4 w-4" />;
			case "angry":
				return <Angry className="mr-2 h-4 w-4" />;
		}
	};

	const handleReaction = (
		type: "like" | "love" | "haha" | "angry",
		target: "post" | "comment",
		commentId?: string,
	) => {
		console.log(
			`Reacted with ${type} to ${target}${
				commentId ? ` (Comment ID: ${commentId})` : ""
			}`,
		);
		// Here you would typically update the state or call an API to record the reaction
	};

	const handleClick = () => {
		if (!isComment) {
			handleReaction(type, "post", undefined);
			return;
		}
		handleReaction(type, "comment", commentId);
	};

	return (
		<Button variant="outline" size="sm" onClick={handleClick}>
			{getIcon()}
			{count}
		</Button>
	);
};
