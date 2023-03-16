import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Image from 'next/image';

const Index = (
  // { handleFetchSpecificUser }
) => {
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
    return (
      <>
        <Image className='largeProfile' src={specificUser.image} width={96} height={96} alt={`${specificUser.name}'s profile picture`} />
        <h1>{specificUser.name}'s Profile</h1>
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
  }
}

export default Index
