import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

App.getInitialProps = async () => ({ pageProps: {} })
export default App