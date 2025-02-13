"use server";

import { prisma } from "@/lib/prisma";
import { FormPostSchema } from "@/lib/schemas";
import type { z } from "zod";

export const createNewPost = async (
	values: z.infer<typeof FormPostSchema>,
): Promise<{
	success?: string;
	error?: string;
	ok?: boolean;
}> => {
	const validateFields = FormPostSchema.safeParse(values);

	if (!validateFields.success) return { error: "Campos invalidos!" };
	const { title, content, category, isAnonymous, authorId } =
		validateFields.data;

	const post = await prisma.post.create({
		data: {
			title,
			content,
			category,
			isAnonymous,
			authorId,
		},
	});

	if (!post) return { error: "Error al crear la publicación", ok: false };

	return { success: "Publicación creada exitosamente", ok: true };
};

export const deletePost = async (postId: string) => {
	const post = await prisma.post.delete({
		where: {
			id: postId,
		},
	});

	if (!post) return { error: "Error al eliminar la publicación", ok: false };

	return { success: "Publicación eliminada", ok: true };
};

export const updatePost = async (
	values: z.infer<typeof FormPostSchema>,
	postId: string,
) => {
	const validateFields = FormPostSchema.safeParse(values);

	if (!validateFields.success) return { error: "Campos invalidos!" };
	const { title, content, category, isAnonymous, authorId } =
		validateFields.data;

	const post = await prisma.post.update({
		where: {
			id: postId,
		},
		data: {
			title,
			content,
			category,
			isAnonymous,
			authorId,
		},
	});

	if (!post) return { error: "Error al actualizar la publicación", ok: false };

	return { success: "Publicación actualizada", ok: true };
};
