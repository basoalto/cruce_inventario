import NextAuth, {AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from 'jsonwebtoken';

const authOptions: AuthOptions =  {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('No credentials provided');
        }
        const { email, password } = credentials;
        const loginUrl: string = process.env.NEXT_PUBLIC_AUTH_LOGIN_URL || '';

        const loginResponse = await fetch(loginUrl, {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
        });
        if (loginResponse.status === 401 || loginResponse.status === 400) {
          throw new Error('No user found');
        }

        const loginData = await loginResponse.json();
        const token: string = loginData.token;

        const decoded = jwt.decode(token, { complete: true }) as any;  // Handle the type correctly
        const client_id = decoded?.payload?.client_id;

        return {
          id: client_id,
          name: email,
          email: email,
          accessToken: token,
          client_id,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
          accessToken: user.accessToken,
          client_id: user.client_id,
        };
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.backendTokens = {
        accessToken: token.accessToken,
      };
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
