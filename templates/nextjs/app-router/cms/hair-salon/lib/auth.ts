// NextAuth (v4) configuration for the App Router.
//
// Auth providers are injected by `rouxui create` based on your selections.
// To add providers manually, see: https://authjs.dev/getting-started/providers
import type { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    // Providers are added here by `rouxui create` (e.g. GoogleProvider, GitHubProvider).
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/api/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as { id?: string }).id = token.sub;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};
