import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      currentRole?: string;
      userId?: string;
      clientId?: string;
      translatorId?: string;
    };
  }

  interface User {
    currentRole?: string;
    userId?: string;
    clientId?: string;
    translatorId?: string;
  }
}
