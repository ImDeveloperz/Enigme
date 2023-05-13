import '@/styles/globals.css'
import {SSRProvider} from '@react-aria/ssr'
import { AuthContext } from '../utils/AuthContext';
import { BrowserRouter } from 'react-router-dom'
export default function App({ Component, pageProps }) {
  return(
    <AuthContext>
        <Component {...pageProps} /> 
    </AuthContext>
  ) 
}
