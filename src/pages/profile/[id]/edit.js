import Image from 'next/image';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"


const EditProfile = (
  // {handleFetchSpecificUser}
) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { id } = router.query;
  const [specificUser, setSpecificUser] = useState()


  useEffect(() => {
    const fetchSpecficUser = async () => {
      const response = await fetch(`/api/user/${id}`)
      const user = await response.json()
      setSpecificUser(user)
    }
    fetchSpecficUser()
    // setSpecificUser(handleFetchSpecificUser(id))
  }, [id])

  const handleEditUserDetails = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch(`/api/user/${id}`, {
        // const response = await fetch(`/api/user/${specificUser._id}`, {
        method: 'PUT',
        body: JSON.stringify(specificUser)
      })
    } catch (error) {
      console.error(error)
    }
    router.push(`/profile/${id}`)
  }


  if (!!specificUser && status === 'authenticated' && specificUser.email === session.user.email) {
    return (
      <section className='profileForm'>
        <div className='profileData'>
          <Image id='largeProfile' src={specificUser.image} width={96} height={96} alt={`${specificUser.name}'s profile picture`} />
          <div>
            <h1>{specificUser.name}&apos;s Profile</h1>
            <p>email: {specificUser.email}</p>

          </div>
        </div>

        <form className='userForm' onSubmit={handleEditUserDetails}>
          <label htmlFor="name">Name:</label>
          <input type="text" id='name' name='name' onChange={(e) => setSpecificUser({ ...specificUser, name: e.target.value })} value={specificUser.name} />
          <label htmlFor="bio">Bio:</label>
          <textarea placeholder='Enter your Bio here' name="bio" id="bio" cols="30" rows="10" onChange={(e) => setSpecificUser({ ...specificUser, bio: e.target.value })} value={specificUser.bio}></textarea>
          <button>Edit Your Profile</button>
        </form>
      </section>
    )
  }
  return <h1>You need to be signed in to see this page</h1>

}

export default EditProfile
