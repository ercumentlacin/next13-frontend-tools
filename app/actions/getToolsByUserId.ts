export default async function getToolsByUserId(userId?: string) {
  "use server";
  const tools = await prisma.tool.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: 0,
    take: 10,
    include: {
      author: true,
    },
    where: {
      authorId: userId,
    },
  });
  return tools;
}
