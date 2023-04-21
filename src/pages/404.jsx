import Link from "next/link"

const Custom404 = () => {
  return (
    <div className="card">
      <h1>Whoops! This page doesn&apos;t exist!</h1>
      <p>Feel free to go back</p>
      <Link className='button' href={'/'}>Home</Link>
    </div>
  )
}

export default Custom404
