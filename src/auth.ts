import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { findUserByEmail } from "./lib/db/user";

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
          const userData = await findUserByEmail(credentials.email as string);
          const user = {
            userId: userData?.id,
            email: userData?.email,
            currentRole: userData?.currentRole,
            clientProfileId: "",
            translatorProfileId: "",
          };
          if (userData?.translatorProfile) {
            user.translatorProfileId = userData.translatorProfile.id;
          }
          if (userData?.clientProfile) {
            user.clientProfileId = userData.clientProfile.id;
          }
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
        token.id = user.userId;
        token.email = user.email;
        token.name = user.name;
        token.currentRole = user.currentRole;
        if (user.translatorId) {
          token.translatorId = user.translatorId;
        }
        if (user.clientId) {
          token.clientRoleId = user.clientId;
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token.id && token.email && token.currentRole) {
        session.user.id = token.id as string;
        session.user.email = token.email;
        session.user.currentRole = token.currentRole as string;
      }
      if (token.translatorId) {
        session.user.translatorId = token.translatorId as string;
      }
      if (token.clientId) {
        session.user.clientId = token.clientId as string;
      }
      return session;
    },
  },
});
