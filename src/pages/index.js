
import Card from '../../components/Card'
import Component from '../../components/Login-btn'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home({ posts, getAllPosts }) {
  const [confirmedUser, setConfirmedUser] = useState()
  const [newestPosts, setNewestPosts] = useState([])
  const [featuredFive, setFeaturedFive] = useState([])
  const [timeRelevantPosts, setTimeRelevantPosts] = useState([])
  const [tagSlogan, setTagSlogan] = useState('')
  const { data: session, status } = useSession()

  const fiveRandomFeaturedPosts = () => {
    const featuredPosts = posts.filter(post => post.featured === true)
    let featured5 = []

    for (let index = 0; index < 5; index++) {
      let randomNumber = Math.floor(Math.random() * featuredPosts.length)
      let randomRecipe = featuredPosts.splice(randomNumber, 1)
      featured5.push(...randomRecipe)
    }
    setFeaturedFive(featured5)
  }

  const timeOfDayRecipes = () => {
    let date = new Date
    let hour = date.getHours()
    const breakfastRecipes = posts.filter(post => post.tags.includes('breakfast'))
    const lunchRecipes = posts.filter(post => post.tags.includes('lunch'))
    const dinnerRecipes = posts.filter(post => post.tags.includes('dinner'))
    const snackRecipes = posts.filter(post => post.tags.includes('snack'))

    if (hour > 5 && hour < 10) {
      setTimeRelevantPosts(breakfastRecipes)
      setTagSlogan('Breakfast Recipes')
    } else if (hour < 14) {
      setTimeRelevantPosts(lunchRecipes)
      setTagSlogan('Lunch time!')
    } else if (hour < 20) {
      setTimeRelevantPosts(dinnerRecipes)
      setTagSlogan('Dinner Recipes')
    } else {
      setTimeRelevantPosts(snackRecipes)
      setTagSlogan('Feeling Snackish?')
    }
  }




  useEffect(() => {
    getAllPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const sortedPosts = posts.sort(function (a, b) {
      return (a.createdAt > b.createdAt) ? -1 : ((a.createdAt < b.createdAt) ? 1 : 0);
    });
    const threeNewestPosts = sortedPosts.slice(0, 3)
    setNewestPosts(threeNewestPosts)

    fiveRandomFeaturedPosts()
    timeOfDayRecipes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <p>Vegan Plus Butter started out as a place for me to write Vegan recipes, but then morphed into adding butter to recipes because I enjoy the depth of flavour it can add to certain dishes. Everything on this website can be made vegan though without sacrificing the taste in any way. I hope you enjoy using it as much as I do!</p>
        </div>
      </section>
      <section className='featuredSection highlight' >
        <h2 className='subTitle'>Featured Recipes</h2>
        <div className='horizontalSection '>
          {featuredFive.map(post => {
            return <Card key={post._id} title={post.title} image={post.images[0]} tags={post.tags} postId={post._id} />
          })}
        </div>
      </section>
      <section className='timeOfDaySection highlight'>
        <h2 className='subTitle'>{tagSlogan}</h2>
        <div className='horizontalSection '>
          {timeRelevantPosts.map(post => {
            return <Card key={post._id} title={post.title} image={post.images[0]} tags={post.tags} postId={post._id} />
          })}
        </div>
      </section>
      {status === 'authenticated' && confirmedUser && confirmedUser.admin === true ? <Link className='new button' href={'/recipe/new'}>➕</Link> : ''}
    </>
  )
}
