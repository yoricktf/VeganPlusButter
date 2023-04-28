import Link from "next/link"
import LoginComponent from "./Login-btn"
import Image from "next/image"

const Navbar = () => {
  return (
    <nav>
      <div id="navContent">
        <div className="navButtons">
          <Link href='/' >
            <Image className="vAndBLogo" src='/logo.svg' alt="Logo" width={30} height={30} />
          </Link>
          <Link href='/search' >Search</Link>
        </div>
        <LoginComponent />
      </div>
    </nav>
  )
}

export default Navbar
