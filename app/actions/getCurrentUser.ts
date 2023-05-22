import prisma from "@/app/libs/prismadb";
import { SafeUser } from "@/types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../libs/authOptions";
// import { unstable_getServerSession } from "next-auth/next";

async function getSession() {
  return getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session || !session.user || !session.user.email) return null;

    const currentUser = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) return null;

    const safeUser: SafeUser = {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };

    return safeUser;
  } catch (error) {
    return null;
  }
}
