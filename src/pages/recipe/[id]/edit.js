import RecipeForm from "../../../../components/RecipeForm"
import { useState, useEffect } from 'react'
import { useRouter } from "next/router"

const Edit = () => {
  const router = useRouter()
  const { id } = router.query;
  const [editMode, setEditMode] = useState(true)
  const [specificPost, setSpecificPost] = useState()


  useEffect(() => {
    if (!!id) {
      const fetchSpecficRecipe = async () => {
        const response = await fetch(`/api/post/${id}`)
        const specificPost = await response.json()
        setSpecificPost(specificPost)
      }
      fetchSpecficRecipe()
    }
  }, [id])

  const editRecipe = async (event, tags, author, method, ingredients, images) => {
    event.preventDefault()
    console.log('EDIT RECIPE BUTTON CLICKED')
    const date = new Date
    const formattedDate = date.toLocaleString()

    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);

    const wholePost = { ...productData, date: formattedDate, author, tags, method, ingredients, images }

    console.log('WHOLE EDITED OBJECT INFO-------------------', wholePost)

  }


  if (specificPost) {
    return (
      <RecipeForm editMode={editMode} recipeValue={specificPost} onSubmit={editRecipe} />
    )
  }
  return <h1>Loading</h1>

}

export default Edit
