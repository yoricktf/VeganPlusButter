import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import NotAuthorized from "../../../components/NotAuthorized"
import ImageUpload from "../../../components/ImageUpload"
import RecipeForm from "../../../components/RecipeForm"


const NewRecipe = () => {
  const { data: session, status } = useSession()
  const [confirmedUser, setConfirmedUser] = useState()
  const router = useRouter()

  const handleRecipeSubmit = async (event, recipe, ingredients, method, author, images) => {
    event.preventDefault()

    const date = new Date
    const formattedDate = date.toLocaleString()

    // const formData = new FormData(event.target);
    // const productData = Object.fromEntries(formData);

    const wholePost = { ...recipe, date: formattedDate, author, method, ingredients, images }

    console.log(wholePost)

    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(wholePost)
    })
    const data = await response.json()

    router.push(`/recipe/${data._id}`)
  }

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

  if (!!confirmedUser) {
    if (status === 'authenticated' && confirmedUser.admin === true) {
      return (
        <RecipeForm onSubmit={handleRecipeSubmit} />
      )
    }
  }
  return <NotAuthorized />
}

export default NewRecipe
