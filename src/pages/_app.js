import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { useEffect, useState } from 'react'
import Layout from "../../components/Layout"
import { useSession, signIn, signOut } from "next-auth/react"


export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [posts, setPosts] = useState([])
  const [specificUser, setSpecificUser] = useState()

  useEffect(() => {
    const getAllPosts = async () => {
      const response = await fetch('/api')
      const allPosts = await response.json()
      setPosts(allPosts)
    }
    getAllPosts()
  }, [])

  const fetchSpecficUser = async (id) => {
    const response = await fetch(`/api/user/${id}`)
    const user = await response.json()
    // setSpecificUser(user)
    return user
  }

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} posts={posts} handleFetchSpecificUser={fetchSpecficUser} />
      </Layout>
    </SessionProvider>
  )
}
