import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const host = request.headers.get("host"); // Use the host header
      const protocol =
        process.env.NODE_ENV === "development" ? "http" : "https"; // Determine protocol

      // Construct the full redirect URL
      const redirectUrl = `${protocol}://${host}${next}`;

      return NextResponse.redirect(redirectUrl);
    }
  }

  const host = request.headers.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  return NextResponse.redirect(`${protocol}://${host}/auth/auth-code-error`);
}
