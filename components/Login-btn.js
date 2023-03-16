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
      <>
        <Image className="profile" src={session.user.image} height={20} width={20} alt={`profile picture for ${session.user.name}`} />
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      sign in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
