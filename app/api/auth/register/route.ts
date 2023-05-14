import prisma from "@/app/libs/prismadb";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { email, password, username } = body;

  const hashedPassword = await bcryptjs.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      username,
    },
  });

  return NextResponse.json(user);
}
