import Link from 'next/link'

const Footer = () => {
  return (
    <footer>
      <Link href='mailto:yorick.tenfeld@gmail.com'>
        feel free to get in touch
      </Link>
      <Link href={`/about`}>
        About us
      </Link>
    </footer>
  )
}

export default Footer
