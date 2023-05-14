import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import getCurrentUser from "./app/actions/getCurrentUser";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const currentUser = await getCurrentUser();
  const { pathname } = request.nextUrl;
  if (
    (pathname.startsWith("/enter") || pathname.startsWith("/new-user")) &&
    !!currentUser
  ) {
    return NextResponse.rewrite(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/enter", "/new-user"],
};
