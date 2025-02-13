import { Header } from "@/components/header";
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
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <h1 className="mb-6 font-bold text-3xl">Publicaciones Recientes</h1>
        {posts.length > 0 ? (
          <PublicationList posts={posts} />
        ) : (
          <p>No hay publicaciones</p>
        )}
      </main>
    </div>
  );
}
