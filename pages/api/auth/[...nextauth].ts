/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { socialLogin } from "@/app/auth/lib";
import { triggerAsyncId } from "async_hooks";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Email from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { string } from "yup";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    // ...add more providers here
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials: any, req: any) {
        return {
          ...credentials,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
      console.log("base", baseUrl);
    },

    async session({ session, trigger, user, token }) {
      //       if (trigger === "update") {
      //         token = { ...token, ...session?.user };
      //       }

      console.log("token di session", token);
      console.log("session", session);

      session.user.id =  String(token.id) ;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.roles = token.roles;

      return session;
    },
    async jwt({ token, user, trigger, account, session, profile }) {
      if (trigger === "update") {
        token = { ...token, ...session?.user };
      }
      if (user) {
        token.id = user.id || token.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = account?.access_token || null;
        token.refreshToken = account?.refresh_token || null;
        // token.role = user.roles || null; // Pastikan role disimpan
      }

      if (session?.user) {
        token.role = session.user.role; // Update token dengan role dari session
      }

      console.log("token", token);
      console.log("account", account);
      console.log("trigger", trigger);
      console.log("user", user);
      console.log("profile", profile);
      if (account?.provider === "google") {
        const res = await socialLogin({
          email: token.email!,
          name: token.name!,
          avatar: token.picture!,
        });
        console.log("res", res);
        return {
          ...token,
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token,
          id: res.data.id,
          role: res.data.role,
          access: ["read"],
        };
      }
      if (account?.provider === "github") {
        const res = await socialLogin({
          email: token.email!,
          name: token.name!,
          avatar: token.picture!,
        });
        console.log("res", res);
        return {
          ...token,
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token,
          id: res.data.id,
          role: res.data.role,
          access: ["read"],
        };
      }

      console.log("user", user);
      return { ...token, ...user };
    },
  },

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/error",
  },
};

export default NextAuth(authOptions);
