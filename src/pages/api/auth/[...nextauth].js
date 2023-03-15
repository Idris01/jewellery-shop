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
        return {...user, email}
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
        const {access:access_token,refresh:refresh_token,user_id,username} = user
        return {
          access_token,
          refresh_token,
          username,
          user_id,
          expire_at: Date.now() + token_validity * 1000
        }
      }
      else if(Date.now() < token.expire_at){
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

          if (!response.ok) throw new Error(response.message)
          
          const data = await response.json()

          

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

      session.user = {...session.user, user_id:token.user_id,email:token.email}
      session.username = token.username
      session.error = token.error
      session.expire_at = token.expire_at
      session.access_token = token.access_token
      return session
    }
  },
  async redirect({url, baseUrl}){
    if (url.startsWith('/')) return `${baseUrl}${url}`;
    else if(new URL(url).origin === baseUrl) return url;

    return baseUrl;
  }
}

export default NextAuth(authOptions)


