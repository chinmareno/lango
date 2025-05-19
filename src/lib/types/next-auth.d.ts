import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      currentRole?: string;
    };
  }

  interface User {
    currentRole?: string;
  }
}
