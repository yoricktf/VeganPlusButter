import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../../db/mongoDBAdapter";

export const authOptions = {
  // Configure one or more authentication providers
  secret: process.env.SECRET,


  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),

  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id
      }
      return session
    }
  }




}
export default NextAuth(authOptions)
