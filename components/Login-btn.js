import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"
import Link from 'next/link'
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'

export default function LoginComponent() {
  const [loggedInUser, setLoggedInUser] = useState()



  const { data: session } = useSession()

  useEffect(() => {
    try {
      const checkUser = async () => {
        if (session) {
          const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(session.user),
          })
          const user = await response.json()
          setLoggedInUser(user[0])
        }
      }
      checkUser()
    } catch (error) {
      console.log(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  if (session && loggedInUser) {
    return (
      <div className="loginOptions">
        {/* <button onClick={() => signOut()}>Sign out</button> */}
        <Link href={`/profile/${loggedInUser._id}`}>
          <Image className="profile" src={session.user.image} height={30} width={30} alt={`profile picture for ${session.user.name}`} />
        </Link>
      </div>
    )
  }
  return (
    <div className="loginOptions">
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  )
}
