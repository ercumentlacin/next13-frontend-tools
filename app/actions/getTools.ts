import prisma from "@/app/libs/prismadb";

export default async function getTools({
  limit = 6,
  skip = 0,
}: {
  limit?: number;
  skip?: number;
}) {
  "use server";
  const tools = await prisma.tool.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
    skip: skip,
    take: limit,
  });
  const totalCount = await prisma.tool.count();
  const pageCount = Math.ceil((await prisma.tool.count()) / limit);
  const currentPage = Math.ceil(skip / limit) + 1;

  const haveNextPage = currentPage < pageCount;
  const havePreviousPage = currentPage > 1;

  return {
    tools,
    totalCount,
    pageCount,
    currentPage,
    haveNextPage,
    havePreviousPage,
  };
}
