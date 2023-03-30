import Link from "next/link"
import LoginComponent from "./Login-btn"
import logo from '../public/logo.png'
import Image from "next/image"

const Navbar = () => {
  return (
    <nav>
      <div id="navContent">
        <div className="navButtons">
          <Link href='/' >
            <Image src={logo} alt="Logo" width={30} height={30}></Image>
          </Link>
          <Link href='/search' >Search</Link>
        </div>
        <LoginComponent />
      </div>
    </nav>
  )
}

export default Navbar
