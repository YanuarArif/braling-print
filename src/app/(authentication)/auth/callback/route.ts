import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/app/utils/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/";

    // Add more detailed environment debugging
    console.log("Detailed Environment check:", {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      // Log only first few characters of the key for security
      anonKeyPrefix: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 6),
      environment: process.env.NODE_ENV,
    });

    if (!code) {
      console.error("No code provided in callback");
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    const supabase = await createClient();

    // Log the attempt to exchange code
    console.log("Attempting to exchange code for session");

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Detailed auth error:", {
        message: error.message,
        status: error.status,
        name: error.name,
        url: process.env.NEXT_PUBLIC_SUPABASE_URL, // Log the full URL being used
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
