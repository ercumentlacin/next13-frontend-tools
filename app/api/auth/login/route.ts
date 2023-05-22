import { userLoginSchema } from "@/app/enter/schemas";
import prisma from "@/app/libs/prismadb";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = userLoginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: parsed.error.issues[0].message,
        error: parsed.error,
      },
      {
        status: 400,
      }
    );
  }

  const {
    data: { email: parsedEmail, password: parsedPassword },
  } = parsed;

  const user = await prisma.user.findFirst({
    where: {
      email: parsedEmail,
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        message: "User not found",
      },
      {
        status: 404,
      }
    );
  }

  const isPasswordValid = await bcryptjs.compare(
    parsedPassword as string,
    user.password as string
  );

  if (!isPasswordValid) {
    return NextResponse.json(
      {
        success: false,
        message: "Password is invalid",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(
    {
      user,
      success: true,
      message: "User logged in",
    },
    {
      status: 200,
    }
  );
}
