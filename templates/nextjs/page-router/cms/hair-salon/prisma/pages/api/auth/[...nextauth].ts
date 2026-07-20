import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { user as users } from "@/db/schema";
import { verifyPassword } from "@/lib/auth";
import { loginSchema } from "@/lib/validations/auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const rows = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1);
        const found = rows[0];
        if (!found || !found.hashedPassword) return null;

        const isValid = await verifyPassword(password, found.hashedPassword);
        if (!isValid) return null;

        return { id: found.id, email: found.email, name: found.name };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user: authUser }) {
      if (authUser) {
        const rows = await db
          .select({
            id: users.id,
            name: users.name,
            image: users.image,
            role: users.role,
          })
          .from(users)
          .where(eq(users.id, authUser.id))
          .limit(1);
        const dbUser = rows[0];
        if (dbUser) {
          token.id = dbUser.id;
          token.name = dbUser.name;
          token.picture = dbUser.image;
          token.role = dbUser.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as string) ?? "USER";
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
