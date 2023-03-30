import Navbar from './Navbar'
import Head from 'next/head'
// import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>VeganPlusButter</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {children}
      {/* <Footer /> */}
    </>
  )
}
