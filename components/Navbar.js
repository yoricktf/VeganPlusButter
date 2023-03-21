import Link from "next/link"
import LoginComponent from "./Login-btn"

const Navbar = () => {
  return (
    <nav>
      <div className="navButtons">
        <Link href='/' >Home</Link>
        <Link href='/search' >Search</Link>
      </div>
      <LoginComponent />
    </nav>
  )
}

export default Navbar
