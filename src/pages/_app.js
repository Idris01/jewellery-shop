import { Inter } from '@next/font/google'

import '@/styles/globals.css'

import {FilledLayout} from '../components/Layout'
import {StoreProvider} from '../components/store'


const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
    <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <FilledLayout>
        <Component {...pageProps} />
      </FilledLayout>
    </StoreProvider>
    
    )
}
