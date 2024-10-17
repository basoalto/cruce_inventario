import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      name: string;
    };
    backendTokens: {
      accessToken: string;
    };
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    email: string;
    name: string;
    accessToken: string;
    client_id: number; 
  }
}
