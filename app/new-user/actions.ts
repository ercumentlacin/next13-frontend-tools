"use server";

import { revalidatePath } from "next/cache";

export async function userRegisterAction(data: FormData) {
  const username = data.get("username") as string;
  const email = data.get("email") as string;
  const password = data.get("password") as string;

  if (!username || !email || !password) return;

  const bcryptjs = await import("bcryptjs").then((mod) => mod.default);
  const prisma = await import("@/app/libs/prismadb").then((mod) => mod.default);

  const hashedPassword = await bcryptjs.hash(password as string, 12);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      // username,
    },
  });

  revalidatePath("/enter");

  return {
    user,
  };
}
