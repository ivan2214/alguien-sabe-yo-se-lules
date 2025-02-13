"use server";

import { FormReportSchema } from "@/lib/schemas";
import type { z } from "zod";

export const createNewReport = async (
	values: z.infer<typeof FormReportSchema>,
	postId: string,
) => {
	const validateFields = FormReportSchema.safeParse(values);

	if (!validateFields.success) return { error: "Campos invalidos!" };
	const { reason, description, authorId } = validateFields.data;

	const report = await prisma.report.create({
		data: {
			reason,
			description,
			authorId,
			postId,
		},
	});

	if (!report) return { error: "Error al crear el reporte" };

	return {
		report,
		success: "Reporte creado exitosamente",
		ok: true,
	};
};
