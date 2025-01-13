import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/app/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  console.log("OAuth Code:", code);

  if (code) {
    try {
      const supabase = await createClient();
      console.log("Supabase Client Initialized:", !!supabase);

      const { error } = await supabase.auth.exchangeCodeForSession(code);
      console.log("Exchange Code Result:", error);

      if (!error) {
        const forwardedHost = request.headers.get("x-forwarded-host");
        const isLocalEnv = process.env.NODE_ENV === "development";

        if (isLocalEnv) {
          return NextResponse.redirect(`${origin}${next}`);
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}${next}`);
        } else {
          return NextResponse.redirect(`${origin}`);
        }
      } else {
        console.error("Exchange Code Error:", error);
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
    }
  }

  console.error("Invalid Code or Exchange Failed");
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
