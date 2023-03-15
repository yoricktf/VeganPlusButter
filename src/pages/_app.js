// import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { useEffect, useState } from 'react'

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
      <Component {...pageProps} posts={posts} />
    </SessionProvider>
  )
}
