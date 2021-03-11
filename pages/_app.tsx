import { AppProps } from 'next/dist/next-server/lib/router/router'
import { ThemeProvider } from '@material-ui/styles'
import { theme } from '../styles/theme'
import '../styles/globals.css'
import '../styles/mapbox.css'
import 'normalize.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
