import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { useEffect, useState } from 'react'
import Layout from "../../components/Layout"
import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({ subsets: ['latin'], weight: ['400', '700'] })

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [posts, setPosts] = useState([])
  const [specificUser, setSpecificUser] = useState()
  const [comments, setComments] = useState([])

  const getAllPosts = async () => {
    const response = await fetch('/api')
    const allPosts = await response.json()
    setPosts(allPosts)
  }

  const getComments = async () => {
    const response = await fetch(`/api/comments`)
    const comments = await response.json()
    setComments(comments)
  }

  const fetchSpecficUser = async (id) => {
    const response = await fetch(`/api/user/${id}`)
    const user = await response.json()
    // setSpecificUser(user)
    return user
  }

  useEffect(() => {
    getAllPosts()
    getComments()
  }, [])




  return (
    <SessionProvider session={session}>
      <main className={openSans.className}>
        <Layout>
          <Component
            {...pageProps}
            posts={posts}
            comments={comments}
            getComments={getComments}
            getAllPosts={getAllPosts}
            handleFetchSpecificUser={fetchSpecficUser} />
        </Layout>
      </main>
    </SessionProvider>
  )
}
