// Auth providers are injected by `rouxui create` based on your selections.
// To add providers manually, see: https://authjs.dev/getting-started/providers
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
});
