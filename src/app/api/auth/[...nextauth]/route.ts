import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"

export const authOptions: AuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_ID as string,
      clientSecret: process.env.TWITTER_SECRET as string,
    })
  ],
  session: { strategy: "jwt" }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }