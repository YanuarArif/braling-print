import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/";

    // Ensure proper URL format
    let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    if (!supabaseUrl.endsWith("/")) {
      supabaseUrl += "/";
    }

    // Clean up anon key (remove any whitespace)
    const anonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();

    // Debug environment
    console.log("Detailed Environment check:", {
      supabaseUrl,
      anonKeyLength: anonKey.length,
      anonKeyPrefix: anonKey.substring(0, 6),
      environment: process.env.NODE_ENV,
    });

    if (!code) {
      console.error("No code provided in callback");
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    // Override createClient with corrected URL
    const supabase = createServerComponentClient(
      { cookies },
      {
        supabaseUrl,
        supabaseKey: anonKey,
      }
    );

    console.log("Attempting to exchange code for session");

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Detailed auth error:", {
        message: error.message,
        status: error.status,
        name: error.name,
        urlUsed: supabaseUrl,
      });
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    const forwardedHost = request.headers.get("x-forwarded-host");
    const isLocalEnv = process.env.NODE_ENV === "development";

    if (isLocalEnv) {
      return NextResponse.redirect(`${origin}${next}`);
    } else if (forwardedHost) {
      return NextResponse.redirect(`https://${forwardedHost}${next}`);
    }

    return NextResponse.redirect(`${origin}`);
  } catch (error) {
    console.error("Detailed callback error:", error);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }
}
