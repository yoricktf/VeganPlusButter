import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from "next-auth/react"
import Link from 'next/link';
import NotAuthorized from '../../../../components/NotAuthorized';


const Index = (
  // { handleFetchSpecificUser }
) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { id } = router.query;
  const [specificUser, setSpecificUser] = useState()

  // useEffect(() => {
  // setSpecificUser(handleFetchSpecificUser(id))
  // }, [id])

  useEffect(() => {
    const fetchSpecficUser = async () => {
      const response = await fetch(`/api/user/${id}`)
      const user = await response.json()
      setSpecificUser(user)
    }
    fetchSpecficUser()
  }, [id])

  if (!!specificUser) {
    if (status === 'authenticated') {
      return (
        <>
          <Image className='largeProfile' src={specificUser.image} width={96} height={96} alt={`${specificUser.name}'s profile picture`} />
          <h1>{specificUser.name}&apos;s Profile</h1>
          {specificUser.email === session.user.email ? <Link href={`/profile/${specificUser._id}/edit`}>Edit your Profile</Link> : <p>DON'T SHOW ANYTHING</p>}

          <p>Bio: {specificUser.bio}</p>

          <section className='usersFavorites'>
            <h2>Favorites</h2>

            {specificUser.favorites.map((favoritedRecipe, index) => {
              return (
                //need to populate the favorites and use the large card component when that has been done.
                <h1 key={index}>favoritedRecipe</h1>
              )
            })}
          </section>
          <section className='usersFavorites'>
            <h2>Comments</h2>
          </section>
        </>
      )
    } else {
      return (

        <NotAuthorized />
      )
    }
  }
}

export default Index
