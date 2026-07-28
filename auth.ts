import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const adminEmails =
  process.env.ADMIN_EMAILS?.split(",").map((email) => email.trim()) ?? [];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ profile }) {
      if (!profile?.email) {
        return false;
      }

      return adminEmails.includes(profile.email);
    },
  },
});