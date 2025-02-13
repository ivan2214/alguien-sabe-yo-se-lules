"use server";

import { FormCommentSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import type { z } from "zod";

export const createNewComment = async (
  values: z.infer<typeof FormCommentSchema>,
  postId: string
) => {
  const validateFields = FormCommentSchema.safeParse(values);

  if (!validateFields.success) return { error: "Campos invalidos!" };
  const { content, authorId } = validateFields.data;

  const comment = await prisma.comment.create({
    data: {
      content,
      authorId,
      postId,
    },
    include: {
      author: true,
    },
  });

  if (!comment) return { error: "Error al crear el comentario" };

  revalidatePath(`/posts/${postId}`);
  return {
    comment,
    success: "Comentario creado exitosamente",
    ok: true,
  };
  //return { success: "Comentario creado exitosamente" };
};
