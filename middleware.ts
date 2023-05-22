import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const isAuth = !!token;
    console.log("🚀 ~ file: middleware.ts:13 ~ middleware ~ isAuth:", isAuth);
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/enter") ||
      req.nextUrl.pathname.startsWith("/new-user");

    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);
