import { AppProps } from 'next/dist/next-server/lib/router/router'
import { ThemeProvider } from '@material-ui/styles'
import { theme } from '../styles/theme'
import Head from 'next/head'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import '../styles/globals.css'
import '../styles/mapbox.css'
import 'normalize.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <link
          href={process.env.NEXT_PUBLIC_MAPBOXGL_CSS_HREF}
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
