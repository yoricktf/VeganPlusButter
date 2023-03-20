import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"
import { useEffect } from "react"
import { useRouter } from 'next/router'

export default function LoginComponent() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    try {
      const checkUser = async () => {
        if (session) {
          const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(session.user),
          })
          const user = await response.json()

          if (!!user._id) {
            router.push(`/profile/${user._id}/edit`)
          }
        }
      }
      checkUser()
    } catch (error) {
      console.log(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])


  if (session) {
    return (
      <div className="loginOptions">
        {/* Signed in as {session.user.email} <br /> */}
        <button onClick={() => signOut()}>Sign out</button>
        <Image className="profile" src={session.user.image} height={30} width={30} alt={`profile picture for ${session.user.name}`} />
      </div>
    )
  }
  return (
    <div className="loginOptions">
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  )
}
