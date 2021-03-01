import { AppProps } from 'next/dist/next-server/lib/router/router'
import '../styles/globals.css'
import '../styles/mapbox.css'
import 'normalize.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
