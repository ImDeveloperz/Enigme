import '@/styles/globals.css'
import { AuthProvider } from '../utils/AuthContext';
import { BrowserRouter } from 'react-router-dom'
export default function App({ Component, pageProps }) {
  return  <Component {...pageProps} /> 
}
