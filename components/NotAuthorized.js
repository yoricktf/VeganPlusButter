import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"

const NotAuthorized = () => {
  const { data: session, status } = useSession()

  return (

    <div className="card">
      <h1>Whoops!</h1>
      <p>Sadly You can not be on this page, feel free to </p>
      <button className="button" onClick={() => signIn()}>Sign in</button>
      <p>or you can go back</p>
      <Link className='button' href={'/'}>Home</Link>
    </div>
  )
}

export default NotAuthorized
