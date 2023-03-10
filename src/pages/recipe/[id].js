import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Image from 'next/image';

const ShowPage = () => {
  const router = useRouter()
  const [specficPost, setSpecficPost] = useState()
  const { id } = router.query;

  useEffect(() => {
    const fetchSpecficRecipe = async () => {
      const response = await fetch(`/api/post/${id}`)
      const specficPost = await response.json()
      setSpecficPost(specficPost)
      console.log(specficPost)
    }
    fetchSpecficRecipe()
  }, [id])

  if (!!specficPost) {
    const { title, method, ingredients, date, description, prepTime, cookTime, tags, images, servingSize } = specficPost
    return (
      <>
        <Image src={images[0]} alt={`image of ${title}`} width={200} height={200} />
        <h1>{title}</h1>
        <ul className='tags'>
          {tags.map(tag => {
            return <li className={`tag ${tag}`} key={tag}>{tag}</li>
          })}
        </ul>
        <p>{description}</p>
        <ul>
          {ingredients.map((ingredient, index) => {
            return <li key={index}>{ingredient}</li>
          })}
        </ul>
        <ol>
          {method.map((step, index) => {
            return <li key={index}>{step}</li>
          })}
        </ol>
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
