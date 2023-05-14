import { PrismaClient } from "@prisma/client";

const withQuery = new PrismaClient({
  // log: ["query"],
});

declare global {
  var prisma: typeof withQuery;
}

const client = globalThis.prisma || withQuery;

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
