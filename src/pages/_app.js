// import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { useEffect, useState } from 'react'
import Layout from "../../components/Layout"


export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getAllPosts = async () => {
      const response = await fetch('/api')
      const allPosts = await response.json()
      setPosts(allPosts)
    }
    getAllPosts()
  }, [])


  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} posts={posts} />
      </Layout>
    </SessionProvider>
  )
}
