import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from "next-auth/react"
import Link from 'next/link';
import NotAuthorized from '../../../../components/NotAuthorized';
import LargeCard from '../../../../components/LargeCard';
import Comment from '../../../../components/Comment';

const Index = (
  // { handleFetchSpecificUser }
) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { id } = router.query;
  const [specificUser, setSpecificUser] = useState()
  const [filteredComments, setFilteredComments] = useState([])

  // useEffect(() => {
  // setSpecificUser(handleFetchSpecificUser(id))
  // }, [id])

  useEffect(() => {
    const fetchSpecficUser = async () => {
      const response = await fetch(`/api/user/${id}`)
      const user = await response.json()
      setSpecificUser(user)
    }

    const fetchUsersComments = async () => {
      const response = await fetch('/api/comments')
      const comments = await response.json()
      console.log(comments)
      const filteredComments = comments.filter(comment => comment.author._id === id)
      const sortedUsersComments = filteredComments.sort(function (a, b) {
        return (a.createdAt > b.createdAt) ? -1 : ((a.createdAt < b.createdAt) ? 1 : 0);
      });
      setFilteredComments(sortedUsersComments)
    }

    fetchSpecficUser()
    fetchUsersComments()
  }, [id])

  if (!!specificUser) {
    if (status === 'authenticated') {
      return (
        <section className='profilePage bodySection'>
          <div className='profileData'>
            <Image className='largeProfile' src={specificUser.image} width={96} height={96} alt={`${specificUser.name}'s profile picture`} />
            <div>
              <h1>{specificUser.name}&apos;s Profile</h1>
              <p>Bio: {specificUser.bio}</p>

            </div>
          </div>
          {specificUser.email === session.user.email ? <Link className='button' href={`/profile/${specificUser._id}/edit`}>Edit your Profile</Link> : ''}
          <section className='usersFavorites'>
            <h2>{specificUser.name}&apos;s Favorites</h2>
            {specificUser.favorites.map((favoritedRecipe, index) => {
              return (
                <LargeCard key={index} recipeInfo={favoritedRecipe} />
              )
            })}
          </section>
          <section className='usersFavorites'>
            <h2>Comments</h2>
            {filteredComments.map((comment, index) => <Comment key={index} userComment={comment} />)}
          </section>
        </section>
      )
    } else {
      return (
        <NotAuthorized />
      )
    }
  }
}

export default Index
