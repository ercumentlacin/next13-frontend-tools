import getCurrentUser from "@/app/actions/getCurrentUser";
import CreatePostDrawerSchema from "@/app/components/drawers/CreatePostDrawer/CreatePostDrawerSchema";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { message: "You must be logged in to do that", success: false },
        { status: 401 }
      );
    }

    const validateBody = CreatePostDrawerSchema.safeParse(body);

    if (!validateBody.success) {
      return NextResponse.json(
        {
          success: false,
          message: validateBody.error.issues[0].message,
          error: validateBody.error,
          path: validateBody.error.issues[0].path[0],
        },
        { status: 400 }
      );
    }

    const { title, description, link, tags } = validateBody.data;

    const user = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        tools: {
          create: {
            title,
            description,
            link,
            tags,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Tool created successfully",
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong", success: false },
      { status: 500 }
    );
  }
}
