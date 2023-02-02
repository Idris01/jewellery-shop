import CredentialsProvider from "next-auth/providers/credentials";
import {login} from '../../../web-urls'
import NextAuth from "next-auth"


export const authOptions = {
  // Configure one or more authentication providers
   pages:{
        signIn:login
      },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
        console.log(credentials)
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
}

export default NextAuth(authOptions)


