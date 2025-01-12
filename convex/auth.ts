import Github from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import Facebook from "@auth/core/providers/facebook";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Github, Google, Facebook],
  callbacks: {
    redirect: async () => {
      return "/dashboard";
    },
  },
});
