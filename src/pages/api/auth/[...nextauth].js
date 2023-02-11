import CredentialsProvider from "next-auth/providers/credentials";
import {login} from '../../../web-urls'
import {login as apiLogin } from '/src/api-urls'
import NextAuth from "next-auth"


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    id: "customCredential",
    name: "Credentials",

    async authorize(credentials, req) {
      
      const {email,password} = credentials
      console.log(password,email)
      const res = await fetch(apiLogin, {
        method: 'POST',
        body: JSON.stringify({email,password}),
        headers: { "Content-Type": "application/json" }
      })
      const user = await res.json()
      console.log(user)
      // If no error and we have user data, return it
      if (res.ok && user) {
        return user
      }
      // Return null if user data could not be retrieved
      return null
    }
  })
],
 pages: {
    signIn: login
  },
}

export default NextAuth(authOptions)


