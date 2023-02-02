import { Inter } from '@next/font/google'

import '@/styles/globals.css'


import { StoreProvider } from '../components/store'
import { SessionProvider } from "next-auth/react"


const inter = Inter({ subsets: ['latin'] })

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
    <StoreProvider>
      <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}</style>
          <Component {...pageProps} />
      </StoreProvider>
    </SessionProvider>
  )
}

