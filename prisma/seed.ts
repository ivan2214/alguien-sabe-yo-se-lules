import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Crear usuarios
  const users = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.user.create({
        data: {
          email: faker.internet.email(),
          name: faker.person.fullName(),
          imageUrl: faker.image.avatar(),
        },
      })
    )
  );

  // Crear posts
  const posts = await Promise.all(
    users.flatMap((user) =>
      Array.from({ length: 3 }).map(() =>
        prisma.post.create({
          data: {
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraphs(2),
            category: faker.word.noun(),
            isAnonymous: faker.datatype.boolean(),
            authorId: user.id,
          },
        })
      )
    )
  );

  // Agregar entre 1 y 30 imágenes por cada post
  await Promise.all(
    posts.flatMap((post) =>
      Array.from({ length: faker.number.int({ min: 1, max: 30 }) }).map(() =>
        prisma.image.create({
          data: {
            url: faker.image.url(),
            postId: post.id,
          },
        })
      )
    )
  );

  // Crear comentarios
  await Promise.all(
    posts.flatMap((post) =>
      users.map((user) =>
        prisma.comment.create({
          data: {
            content: faker.lorem.sentence(),
            authorId: user.id,
            postId: post.id,
          },
        })
      )
    )
  );

  // Crear reportes
  await Promise.all(
    posts.flatMap((post) =>
      users.map((user) =>
        prisma.report.create({
          data: {
            reason: faker.lorem.words(3),
            description: faker.lorem.sentence(),
            authorId: user.id,
            postId: post.id,
          },
        })
      )
    )
  );

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
