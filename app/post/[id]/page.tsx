import { Header } from "@/components/header";
import { PostDetail } from "@/components/post-detail";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ id: string }>;

export default async function PostPage({ params }: { params: Params }) {
  const { id } = await params;

  console.log("id", id);

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
      comments: {
        include: {
          author: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      images: true,
    },
  });

  if (!post) {
    return <div>Post no encontrado</div>;
  }

  return <PostDetail post={post} />;
}
