"use client";

import toast from "@/app/libs/toast";
import { BaseResponse, SafeUser } from "@/types";
import { Tool } from "@prisma/client";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

interface HomePageButtonGroupProps {
  currentUser: SafeUser | null;
  tool: Tool & {
    author: User;
  };
}

async function baseToggle(
  tool: Tool & { author: User },
  router: ReturnType<typeof useRouter>,
  query: "like" | "bookmark"
) {
  try {
    const res = await fetch(`/api/tools/${tool.id}/${query}`, {
      method: "POST",
    });
    const data = (await res.json()) as BaseResponse;
    toast(data.message, data.success ? "success" : "error");
    if (data.success) router.refresh();
  } catch (error) {
    console.log(error);
    toast("Something went wrong", "error");
  }
}

export default function HomePageButtonGroup({
  currentUser,
  tool,
}: HomePageButtonGroupProps) {
  const router = useRouter();

  const toggleLikeTool = async () => baseToggle(tool, router, "like");
  const toggleBookmarkTool = async () => baseToggle(tool, router, "bookmark");

  return (
    <div className="flex items-center gap-2">
      {currentUser?.likes?.find((like) => like === tool.id) ? (
        <button
          onClick={toggleLikeTool}
          className="btn btn-sm btn-circle btn-outline group hover:bg-base-100"
        >
          <AiFillLike className="w-4 h-4 transition-all duration-500 ease-in-out fill-accent" />
        </button>
      ) : (
        <button
          onClick={toggleLikeTool}
          className="btn btn-sm btn-circle btn-outline group hover:bg-base-100"
        >
          <AiOutlineLike className="w-4 h-4 transition-all duration-500 ease-in-out group-hover:fill-accent" />
        </button>
      )}
      {currentUser?.bookmarks?.find((bookmark) => bookmark === tool.id) ? (
        <button
          onClick={toggleBookmarkTool}
          className="btn btn-sm btn-circle btn-outline group hover:bg-base-100"
        >
          <FaBookmark className="w-4 h-4 transition-all duration-500 ease-in-out fill-accent" />
        </button>
      ) : (
        <button
          onClick={toggleBookmarkTool}
          className="btn btn-sm btn-circle btn-outline group hover:bg-base-100"
        >
          <FaRegBookmark className="w-4 h-4 transition-all duration-500 ease-in-out group-hover:fill-accent" />
        </button>
      )}
    </div>
  );
}
