import '@/styles/globals.css'
import {SSRProvider} from '@react-aria/ssr'
import { AuthContext } from '../utils/AuthContext';
import { BrowserRouter } from 'react-router-dom'
import { SessionProvider } from "next-auth/react"
export default function App({ Component, pageProps,session }) {
  return(
    <AuthContext>
        <Component {...pageProps} /> 
    </AuthContext>
  ) 
}
