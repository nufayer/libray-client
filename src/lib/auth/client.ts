import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  fetchOptions: {
    credentials: "include",
  },
  plugins: [
    inferAdditionalFields({
      user: {
        role: { type: "string" },
      },
    }),
  ],
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;

export type Session = typeof authClient.$Infer.Session;
export type User = typeof authClient.$Infer.Session["user"];

export default authClient;
