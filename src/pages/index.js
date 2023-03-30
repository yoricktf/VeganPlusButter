
import Card from '../../components/Card'
import Component from '../../components/Login-btn'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home({ posts, getAllPosts }) {
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


  // const fiveRandomFeaturedPosts = () => {
  //   // console.log(posts)
  //   const featuredPosts = posts.filter(post => post.featured === true)
  //   const arraylength = featuredPosts.length - 1
  //   const randomNumber = Math.floor(Math.random() * arraylength)
  //   let featured5 = []

  //   console.log(featuredPosts)

  //   console.log(featuredPosts.slice(randomNumber, randomNumber + 1))

  //   for (let index = 0; index < 3; index++) {

  //   //   const featuredPosts = posts.filter(post => post.featured === true)
  //   //   const arraylength = featuredPosts.length - 1
  //   //   const randomNumber = Math.floor(Math.random() * arraylength)
  //   //   // console.log(index, featuredPosts.slice(randomNumber, 1));
  //   //   featured5.push(featuredPosts.slice(randomNumber, randomNumber + 1));
  //   }

  //   // console.log(featured5)
  //   // console.log(featuredPosts)
  // }

  // fiveRandomFeaturedPosts()


  useEffect(() => {
    getAllPosts()
  }, [])

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
        <div className='blurb'>
          <h1 className='title'>VEGAN PLUS BUTTER</h1>
          <p>Vegan Plus Butter started out as a place for me to write Vegan recipes, but then morphed into adding butter to recipes because I enjoy the depth of flavour it can add to certain dishes. Everything on this website can be made vegan though without sacrificing the taste in any way. I hope you enjoy using it as much as I do! and if you are reading this part let me know and we will have abeer together</p>

        </div>
      </section>
      <h2 className='title'>Featured Recipes</h2>
      <div className='horizontalSection'>
        {posts.map(post => {
          if (post.featured) { return <Card key={post._id} title={post.title} image={post.images[0]} tags={post.tags} postId={post._id} /> }
        })}
      </div>
      {status === 'authenticated' && confirmedUser && confirmedUser.admin === true ? <Link className='new button' href={'/recipe/new'}>➕</Link> : ''}
    </>
  )
}
