import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// NextAuth v4 API route for the Pages Router.
export default NextAuth(authOptions);
