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

  const editRecipe = async (event) => {
    event.preventDefault()
    console.log('EDIT RECIPE BUTTON CLICKED')
  }


  if (specificPost) {
    return (
      <RecipeForm editMode={editMode} recipeValue={specificPost} onSubmit={editRecipe} />
    )
  }
  return <h1>Loading</h1>

}

export default Edit
