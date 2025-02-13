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
				},
			},
			images: true,
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
						<Link href="/about" className="text-primary hover:underline">
							About
						</Link>
					</li>
					<li>
						<Link href="/contact" className="text-primary hover:underline">
							Contact
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
