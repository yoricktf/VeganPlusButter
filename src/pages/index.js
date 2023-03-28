
import Card from '../../components/Card'
import Component from '../../components/Login-btn'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home({ posts }) {
  const [confirmedUser, setConfirmedUser] = useState()
  const [newestPosts, setNewestPosts] = useState([])
  const { data: session, status } = useSession()


  useEffect(() => {
    const sortedPosts = posts.sort(function (a, b) {
      return (a.createdAt > b.createdAt) ? -1 : ((a.createdAt < b.createdAt) ? 1 : 0);
    });

    const threeNewestPosts = sortedPosts.slice(0, 3)
    setNewestPosts(threeNewestPosts)
  }, [posts])



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

    <section className="bodySection">
      {newestPosts.length > 0 &&
        <section id='newestPosts'>
          <div className='imageContainer'>
            <Link href={`recipe/${newestPosts[0]._id}`}>
              <p>Latest Recipe</p>
              <Image src={newestPosts[0].images[0]} alt={'Newest Post'}
                fill
                sizes="60%"
                style={{ objectFit: 'cover' }} />
            </Link>
          </div>
          <div>
            <div className='imageContainer'>
              <Link href={`recipe/${newestPosts[1]._id}`}>
                <Image src={newestPosts[1].images[0]} alt={'Second newest Post'} fill
                  sizes="60%"
                  style={{ objectFit: 'cover' }} />
              </Link>
            </div>
            <div className='imageContainer'>
              <Link href={`recipe/${newestPosts[2]._id}`}>
                <Image src={newestPosts[2].images[0]} alt={'Third Newest Post'} fill
                  sizes="60%"
                  style={{ objectFit: 'cover' }} />
              </Link>
            </div>
          </div>
        </section>
      }
      <h2 className='title'>Featured Recipes</h2>
      <ul className='horizontalSection'>
        {posts.map(post => {
          if (post.featured) { return <Card key={post._id} title={post.title} image={post.images[0]} tags={post.tags} postId={post._id} /> }
        })}
      </ul>
      {status === 'authenticated' && confirmedUser && confirmedUser.admin === true ? <Link className='new button' href={'/recipe/new'}>New Recipe</Link> : ''}
    </section>
  )
}
