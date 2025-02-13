import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	await prisma.post.create({
		data: {
			title: "Post de prueba",
			content: "Este es un post de prueba",
			category: "General",
		},
	});

	const posts = await prisma.post.findMany();
	console.log(posts);
}

main()
	.catch((e) => console.error(e))
	.finally(() => prisma.$disconnect());
