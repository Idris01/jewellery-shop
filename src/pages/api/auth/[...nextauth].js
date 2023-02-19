import CredentialsProvider from "next-auth/providers/credentials";
import {login} from '../../../web-urls'
import {login as apiLogin, token_validity, token_refresh as refresh_url } from '/src/api-urls'
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
      let formData = new FormData()
      formData.append('email',email)
      formData.append('password',password)
      
      const res = await fetch(apiLogin, {
        method: 'POST',
        body: formData,
        redirect: 'follow'
      })
      const user = await res.json()
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
        const {access:access_token,refresh:refresh_token,user_id,username,access_validity} = user
        return {
          access_token,
          refresh_token,
          username,
          user_id,
          expire_at: Date.now() + access_validity * 1000
        }
      }
      else if(Date.now() < token.expire_at){
        console.log("token expired")
        return token
      }
      else{
        try{
          let formData = new FormData();
          formData.append("refresh",token.refresh_token)
          let requestOptions = {
            method: 'POST',
            body: formData,
            redirect:'follow'
          }
          const response = await fetch(refresh_url,requestOptions)

          const data = await response.json()

          if (!response.ok) throw data

          return {
            ...token,
            access_token: data.access,
            refresh_token: data.refresh_token ?? token.refresh_token,
            expire_at: Date.now() + token_validity * 1000
          }
        }
        catch (error){
          console.log("Error refreshing access token", error)
          return {...token, error: "RefreshAccessTokenError"}
        }
      }
    },
    async session({ session, token, user }){

      session.user_id = token.user_id
      session.username = token.username
      session.error = token.error
      session.access_token = token.access_token
      return session
    }
  }
}

export default NextAuth(authOptions)


