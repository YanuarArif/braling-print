import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/app/utils/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/";

    if (!code) {
      console.error("No code provided in callback");
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Supabase auth error:", error.message);
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
    console.error("Callback route error:", error);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }
}
