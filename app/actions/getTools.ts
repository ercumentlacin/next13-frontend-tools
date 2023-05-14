export default async function getTools() {
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
  });
  return tools;
}
