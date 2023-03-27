
import Card from '../../components/Card'
import Component from '../../components/Login-btn'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Home({ posts }) {
  const [confirmedUser, setConfirmedUser] = useState()
  const { data: session, status } = useSession()

  useEffect(() => {
    try {
      const checkIfAdmin = async () => {
        if (session) {
          const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(session.user),
          })
          const user = await response.json()
          setConfirmedUser(user[0])
        }
      }
      checkIfAdmin()
    } catch (error) {
      console.log(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  return (
    <>
      <ul>
        {posts.map(post => {
          if (post.featured) { return <Card key={post.id} title={post.title} image={post.images[0]} tags={post.tags} postId={post._id} /> }
        })}

        {status === 'authenticated' && confirmedUser && confirmedUser.admin === true ? <Link className='newRecipe button' href={'/recipe/new'}>Make a new Recipe</Link> : ''}
      </ul>
    </>
  )
}
