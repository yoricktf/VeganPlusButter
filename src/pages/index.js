import Head from 'next/head'
import Card from '../../components/Card'
import Component from '../../components/Login-btn'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export default function Home() {
  const [posts, setPosts] = useState([])
  const { data: session, status } = useSession()


  useEffect(() => {
    const getAllPosts = async () => {
      const response = await fetch('/api')
      const allPosts = await response.json()
      setPosts(allPosts)
    }
    getAllPosts()
  }, [])


  return (
    <>
      <Head>
        <title>VeganPlusButter</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component />
      <h1>posts</h1>
      <ul>
        {posts.map(post => {
          if (post.featured) {
            return <Card key={post._id} title={post.title} image={post.images[0]} tags={post.tags} postId={post._id} />
          }
        })}
      </ul>
    </>
  )
}
