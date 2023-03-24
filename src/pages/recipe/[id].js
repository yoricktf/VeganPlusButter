import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Tag from '../../../components/Tag';
import CommentForm from '../../../components/CommentForm';
import { useSession } from "next-auth/react"
import Comment from '../../../components/Comment';
import starOutline from '../../../public/starOutline.png'
import starFilled from '../../../public/starFilled.png'

const ShowPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [specficPost, setSpecficPost] = useState()
  const [comments, setComments] = useState([])
  const [userFavorites, setUserFavorites] = useState()
  const { id } = router.query;

  console.log('----------------USERFAVORITES+++===', userFavorites)

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch('/api/comments')
      const comments = await response.json()
      const filteredComments = comments.filter(comment => comment.post === id)
      setComments(filteredComments)
    }
    fetchComments()
  }, [])

  useEffect(() => {
    if (!!id) {
      const fetchSpecficRecipe = async () => {
        const response = await fetch(`/api/post/${id}`)
        const specficPost = await response.json()
        setSpecficPost(specficPost)
      }
      fetchSpecficRecipe()
    }
  }, [id])

  useEffect(() => {
    if (session) {
      const checkFavorites = async () => {
        const response = await fetch('/api/favorite', {
          method: 'POST',
          body: session.user.id
        })
        const favorites = await response.json()
        console.log(favorites)
        setUserFavorites(favorites)
      }
      checkFavorites()
    }
  }, [session])

  const toggleFavorite = async () => {
    console.log('first')
    const favoritesInfo = { userId: session.user.id, postId: id }

    const response = await fetch('/api/favorite', {
      method: 'PATCH',
      body: JSON.stringify(favoritesInfo)
    })
    const userFavorites = await response.json()
    setUserFavorites(userFavorites)
    console.log('=============USERFAVORITES', userFavorites)
  }


  if (!!specficPost) {
    const { title, method, ingredients, date, description, prepTime, cookTime, tags, images, servingSize } = specficPost
    return (
      <>
        <div id='recipeShowImageContainer'>
          <h1>{title}</h1>
          <Image
            id='recipeShowImage'
            src={images[0]}
            alt={`image of ${title}`}
            fill
            sizes="100%"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <section id='showPageBody'>
          {status === 'authenticated' && userFavorites ?

            userFavorites.includes(id) ?
              <Image onClick={toggleFavorite} src={starFilled} width={20} height={20} alt='outline of a star' />
              :
              <Image onClick={toggleFavorite} src={starOutline} width={20} height={20} alt='outline of a star' />

            : ''}

          <div className='tags'>
            {tags.map(tag => <Tag key={tag} tag={tag} />)}
          </div>
          <p>{description}</p>
          <h2>Ingredients</h2>
          <ul>
            {ingredients.map((ingredient, index) => {
              return <li key={index}>{ingredient}</li>
            })}
          </ul>
          <h2>Method</h2>
          <ol>
            {method.map((step, index) => {
              return <li key={index}>{step}</li>
            })}
          </ol>
        </section>

        {status === 'authenticated' ? <CommentForm recipeId={id} userId={session.user.id} /> : <p>Sign in to leave comments</p>}
        <section className='comments'>
          {comments.map((comment, index) => {
            return (
              <Comment key={index} userComment={comment} />
            )
          })}
        </section>
      </>
    )
  }

  return (
    <>
      <h1>Loading</h1>
    </>
  )
}

export default ShowPage
