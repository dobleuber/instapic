import '../styles/globals.scss'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <Head>
        <title>Instapics</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Container>
  )
}

export default MyApp
