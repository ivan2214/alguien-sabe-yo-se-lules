import { Header } from "@/components/header";
import { PublicationList } from "@/components/publication-list";
import { prisma } from "@/lib/prisma";
import { FilterDialog } from "@/components/filter-dialog";

type SearchParams = Promise<{ q: string; category: string }>;

export default async function Search({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q } = await searchParams;

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
      images: true,
    },
    where: {
      AND: [{ title: { contains: q } }, { content: { contains: q } }],
    },
  });
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <h1 className="mb-6 font-bold text-3xl">Buscar Publicaciones</h1>
        <FilterDialog />

        <PublicationList posts={posts} />
      </main>
    </div>
  );
}
