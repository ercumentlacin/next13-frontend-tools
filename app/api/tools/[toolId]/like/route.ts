import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: { toolId: string };
  }
) {
  try {
    const { toolId } = params;
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          message: "You must be logged in to like/unlike a tool",
          success: false,
        },
        { status: 401 }
      );
    }

    const tool = await prisma.tool.findUnique({
      where: { id: toolId },
    });

    if (!tool) {
      return NextResponse.json(
        {
          message: "Tool not found",
          success: false,
        },
        { status: 404 }
      );
    }

    let userLikes = user.likes || [];

    if (userLikes.includes(toolId)) {
      userLikes = userLikes.filter((id) => id !== toolId);
    } else {
      userLikes.push(toolId);
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        likes: userLikes,
      },
    });

    let usersLiked = tool.likes || [];

    if (usersLiked.includes(user.id)) {
      usersLiked = usersLiked.filter((id) => id !== user.id);
    } else {
      usersLiked.push(user.id);
    }

    await prisma.tool.update({
      where: { id: toolId },
      data: {
        likes: usersLiked,
      },
    });

    return NextResponse.json(
      {
        message: "Tool liked/unliked successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    const e = error as Error;
    return NextResponse.json(
      {
        message: e.message,
        success: false,
      },
      { status: 500 }
    );
  }
}
