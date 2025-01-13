import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const { searchParams, origin } = requestUrl;
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/";

    // Get cookie store
    const cookieStore = cookies();

    let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    if (!supabaseUrl.endsWith("/")) {
      supabaseUrl += "/";
    }
    const anonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();

    // Create client with cookie store
    const supabase = createServerComponentClient(
      { cookies: () => cookieStore },
      {
        supabaseUrl,
        supabaseKey: anonKey,
      }
    );

    if (!code) {
      console.error("No code provided in callback");
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    console.log("Attempting to exchange code for session");

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Auth error details:", {
        message: error.message,
        status: error.status,
        name: error.name,
        code: code?.substring(0, 6) + "...",
        cookiesExist: (await cookieStore).getAll().length > 0,
      });

      // If we get a PKCE error, redirect to sign in
      if (error.message.includes("code challenge")) {
        return NextResponse.redirect(`${origin}/auth/signin`);
      }

      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    // Successful authentication
    return NextResponse.redirect(`${origin}${next}`);
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }
}
