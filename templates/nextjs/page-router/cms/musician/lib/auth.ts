import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { db, isDbConnected } from "@/lib/db";
import { users } from "@/db/schema";

/**
 * NextAuth v4 config (idiomatic for the Pages Router). OAuth providers read
 * their AUTH_*_ID / _SECRET (mapped below) from the environment; Credentials
 * verifies against the `users` table with a bcrypt-hashed password.
 */
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
    }),
    AppleProvider({
      clientId: process.env.AUTH_APPLE_ID ?? "",
      clientSecret: process.env.AUTH_APPLE_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password || !isDbConnected) {
          return null;
        }
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email))
          .limit(1);
        if (!user?.password) return null;

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;

        return {
          id: user.id,
          name: user.name ?? undefined,
          email: user.email,
          image: user.image ?? undefined,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/sign-in", error: "/error" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) session.user.id = token.id as string;
      return session;
    },
  },
};
