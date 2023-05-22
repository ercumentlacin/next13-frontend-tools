import NextAuth from "next-auth";

import { authOptions } from "@/app/libs/authOptions";
import prisma from "@/app/libs/prismadb";

if (!process.env.GOOGLE_CLIENT_ID) throw new Error("Missing GOOGLE_CLIENT_ID");
if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing GOOGLE_CLIENT_SECRET");
}

if (!process.env.GITHUB_ID) throw new Error("Missing GITHUB_ID");
if (!process.env.GITHUB_SECRET) throw new Error("Missing GITHUB_SECRET");

if (typeof prisma === "undefined" || !prisma) throw new Error("Missing prisma");

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
