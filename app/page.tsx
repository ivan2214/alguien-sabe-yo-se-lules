import { PublicationList } from "@/components/publication-list";
import { prisma } from "@/lib/prisma";

export default async function Home() {
	const posts = await prisma.post.findMany({
		take: 10,
		orderBy: { createdAt: "desc" },
		include: {
			author: true,
			comments: {
				include: {
					author: true,
					reactions: {
						include: {
							post: true, // Asegúrate de incluir la relación con el post
							comment: true, // Asegúrate de incluir la relación con el comentario
						},
					},
				},
				orderBy: {
					createdAt: "desc",
				},
			},
			images: true,
			reactions: {
				include: {
					comment: true,
					post: true,
				},
			},
		},
	});

	return (
		<section className="container mx-auto px-6 py-8">
			<h1 className="mb-6 font-bold text-3xl">Publicaciones Recientes</h1>
			{posts.length > 0 ? (
				<PublicationList posts={posts} />
			) : (
				<p>No hay publicaciones</p>
			)}
		</section>
	);
}
