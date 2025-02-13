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

  if (!post) {
    return <div>Post no encontrado</div>;
  }

  return <PostDetail post={post} />;
}
