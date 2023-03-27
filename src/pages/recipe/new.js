import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import NotAuthorized from "../../../components/NotAuthorized"
import ImageUpload from "../../../components/ImageUpload"
import RecipeForm from "../../../components/RecipeForm"

const NewRecipe = () => {
  const { data: session, status } = useSession()
  const [confirmedUser, setConfirmedUser] = useState()

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
        <RecipeForm />
      )
    }

  }
  return <NotAuthorized />
}

export default NewRecipe
