import Link from "next/link"
import LoginComponent from "./Login-btn"


const Navbar = () => {
  return (
    <nav><LoginComponent /><Link href='/search' >Search</Link></nav>
  )
}

export default Navbar
