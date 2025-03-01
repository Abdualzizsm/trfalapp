import '../styles/globals.css?v=1'
import Head from 'next/head'
import { Tajawal } from 'next/font/google'

const tajawal = Tajawal({ 
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
})

function MyApp({ Component, pageProps }) {
  return (
    <main className={`${tajawal.className} rtl`}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <meta name="theme-color" content="#007aff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" />
        <title>TraFl - مخطط رحلاتك الذكي</title>
      </Head>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
