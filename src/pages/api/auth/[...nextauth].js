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
      let formData = new FormData()
      formData.append('email',email)
      formData.append('password',password)
      
      const res = await fetch(apiLogin, {
        method: 'POST',
        body: formData,
        redirect: 'follow'
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
  callbacks:{
    async jwt({token, user, account, profile}){

      if(account){
        token.accessToken = user.access
        token.refreshToken = user.refresh
        token.accessValidity = user.access_validity
        token.userId = user.user_id
        token.username = user.username
      }
      return token
    },
    async session({ session, token, user }){
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.accessValidity = token.accessValidity
      session.userId = token.userId
      session.username = token.username

      return session
    }
  }
}

export default NextAuth(authOptions)


