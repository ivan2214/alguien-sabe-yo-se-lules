import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Search } from "./search";

export async function Header() {
	const posts = await prisma.post.findMany({
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
		<header className="flex items-center justify-between bg-white p-4 shadow-md">
			<Link href="/" className="font-bold text-2xl text-primary">
				BlogName
			</Link>
			<Search posts={posts} />
			<nav>
				<ul className="flex space-x-4">
					<li>
						<Link href="/" className="text-primary hover:underline">
							Inicio
						</Link>
					</li>
					<li>
						<Link href="/search" className="text-primary hover:underline">
							Buscar
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
