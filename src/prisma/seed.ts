import { prisma } from "../config";

const main = async () => {
  const promo = await prisma.promo.create({
    data: {
      title: "Summar Sale",
    },
  });

  const tags = await Promise.all([
    prisma.tag.create({
      data: {
        name: "Technology",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Lifestyle",
      },
    }),
  ]);

  const article = await prisma.article.create({
    data: {
      title: "Getting Started with Prisma",
      content: "This is a sample article about Prisma...",
      promoId: promo.id,
      articleTags: {
        create: tags.map((tag) => ({
          tagId: tag.id,
        })),
      },
    },
  });

  console.log({ promo, tags, article });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
