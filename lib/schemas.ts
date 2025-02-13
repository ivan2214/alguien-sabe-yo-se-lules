import { z } from "zod";

export const FormPostSchema = z.object({
	title: z.string().min(1, { message: "El título es requerido" }),
	content: z.string().min(1, { message: "El contenido es requerido" }),
	category: z.string().min(1, { message: "La categoría es requerida" }),
	isAnonymous: z.boolean(),
	authorId: z.string(),
});

export const FormCommentSchema = z.object({
	content: z.string().min(1, { message: "El contenido es requerido" }),
	authorId: z.string(),
});

export const FormReportSchema = z.object({
	reason: z.string().min(1, { message: "La razón es requerida" }),
	description: z.string().min(1, { message: "La descripción es requerida" }),
	authorId: z.string(),
});
