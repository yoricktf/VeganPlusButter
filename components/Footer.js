import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer>
      <div className='footerBody'>
        <div>

          <a href="#top">
            <Image
              className='socialLogo arrowUp'
              src='/arrowUp.svg'
              alt='instagram'
              height={80}
              width={80}
              color='white'
            /></a>
          <section className='footerLinks'>
            <ul>
              <li><h3 className='vAndBText'>VEGAN PLUS BUTTER</h3></li>
              <li><Link href='/'>Home</Link></li>
              <li><Link href='/'>About</Link></li>
            </ul>
          </section>
        </div>
        <section className='footerContact'>
          <Link className='socialLink' href='mailto:yorick.tenfeld@gmail.com'>
            <Image
              className='socialLogo'
              src='/arrowDiagonalRight.svg'
              alt='instagram'
              height={25}
              width={25}
              color='white'
            />
            <p>
              emailAddress@link.com
            </p>
          </Link>
          <Link className='socialLink' href={`https://www.instagram.com/yoricktf88/`}>
            <Image
              className='socialLogo'
              src='/instagram.svg'
              alt='instagram'
              height={25}
              width={25}
              color='white'
            />
            <p>Instagram</p>
          </Link>
          <Link className='socialLink' href={`https://www.instagram.com/yoricktf88/`}>
            <Image
              className='socialLogo'
              src='/dog.svg'
              alt='instagram'
              height={25}
              width={25}
              color='white'
            />
            <p>Pepper the dog</p>
          </Link>
        </section>


      </div>

      <p className='footerDetail'>©2023</p>
    </footer>
  )
}

export default Footer
