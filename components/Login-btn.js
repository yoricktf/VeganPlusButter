import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"
import Link from 'next/link'
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'

export default function LoginComponent() {
  const [loggedInUser, setLoggedInUser] = useState()
  const { data: session } = useSession()

  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  // // Close the dropdown menu if the user clicks outside of it
  // window.onclick = function (event) {
  //   if (!event.target.matches('.dropbtn')) {
  //     var dropdowns = document.getElementsByClassName("dropdown-content");
  //     var i;
  //     for (i = 0; i < dropdowns.length; i++) {
  //       var openDropdown = dropdowns[i];
  //       if (openDropdown.classList.contains('show')) {
  //         openDropdown.classList.remove('show');
  //       }
  //     }
  //   }
  // }




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
      <div className="loginOptions dropdown">
        {/* <button onClick={() => signOut()}>Sign out</button> */}
        {/* <Link href={`/profile/${loggedInUser._id}`}> */}
        <Image
          onClick={myFunction}
          class="dropbtn"
          className="profile"
          src={session.user.image}
          height={30}
          width={30}
          alt={`profile picture for ${session.user.name}`} />
        <div id="myDropdown" class="dropdown-content">
          <Link href={`/profile/${loggedInUser._id}`}>Profile</Link>
          <p>About</p>
          <p onClick={() => signOut()}>Sign Out</p>
        </div>

        {/* </Link> */}
      </div>
    )
  }
  return (
    <div className="loginOptions">
      <button className="signIn" onClick={() => signIn()}>Sign in</button>
    </div>
  )
}
