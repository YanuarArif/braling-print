import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } =
    process.env;

  if (!NEXT_PUBLIC_SUPABASE_URL || !NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Supabase environment variables are not set.");
  }

  // Extract session token from cookies
  const sessionCookie = req.cookies.get("supabase-auth-token");
  const url = req.nextUrl.clone();

  if (sessionCookie) {
    // If user is logged in, redirect them from login to dashboard
    if (url.pathname === "/login") {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  } else {
    // If no session and trying to access protected route
    const protectedRoutes = ["/dashboard"]; // Add all protected paths here
    if (protectedRoutes.some((path) => url.pathname.startsWith(path))) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard", "/protected/*"], // Adjust paths as needed
};
