
import Card from '../../components/Card'
import Component from '../../components/Login-btn'
// import { useEffect, useState } from 'react'
// import { useSession } from 'next-auth/react'

export default function Home({ posts }) {
  // const { data: session, status } = useSession()

  return (
    <>

      <h1>posts</h1>
      <ul>
        {posts.map(post => {
          if (post.featured) { return <Card key={post._id} title={post.title} image={post.images[0]} tags={post.tags} postId={post._id} /> }
        })}
      </ul>
    </>
  )
}
