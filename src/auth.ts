import { findUserByEmail } from "@/lib/db/findUserByEmail";
import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export const {
  handlers: { GET, POST },
  signIn,
  auth,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials) {
            return null;
          }
          const user = await findUserByEmail(credentials.email as string);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: { signIn: "/auth/register" },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.currentRole = user.currentRole;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token.id && token.email) {
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.currentRole = token.currentRole as string;
      }
      return session;
    },
  },
});
