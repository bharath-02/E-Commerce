import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    authorized({ request, auth }: any) {
      const protectedPaths = [
        /\/shipping-address/,
        /\/payment-method/,
        /\/place-order/,
        /\/profile/,
        /\/user\/(.*)/,
        /\/order\/(.*)/,
        /\/admin/,
      ];

      const { pathname } = request.nextUrl;

      // Check if user is not authenticated & accessing a protected path
      if (!auth && protectedPaths.some((p) => p.test(pathname))) return false;

      if (!request.cookies.get("sessionCartId")) {
        const sessionCartId = crypto.randomUUID();

        const newRequestHeaders = new Headers(request.headers);

        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        });

        response.cookies.set("sessionCartId", sessionCartId);

        return response;
      }

      return true;
    },

    async jwt({ user, token }: any) {
      if (user) {
        token.role = user.role;

        if (user.name === "NO_NAME" && user.email) {
          token.name = user.email.split("@")[0];
        }
      }

      return token;
    },

    async session({ session, user, trigger, token }: any) {
      // Set the user ID from token
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;

      // If there is an update, set the user name
      if (trigger === "update") {
        session.user.name = user.name;
      }

      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
