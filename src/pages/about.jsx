import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const About = () => {
  const [admins, setAdmins] = useState([])


  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users')
      const data = await response.json()
      setAdmins(data)
    }
    fetchUsers()
  }, [])

  console.log(admins)




  return (
    <>
      <h1>Vegan Plus Butter</h1>
      <p>Vegan plus butter is a simple website to showcase reciepes from our contributers, feel free to check them out and see what they have favorited and commented on.</p>
      {admins.map(admin => (
        <div key={admin._id}>
          <Link href={`/profile/${admin._id}`}>
            <div className='card'>
              <Image src={admin.image} alt={`${admin.name}'s profile picture`} className='profile' height={100} width={100} />
              <h2>
                {admin.name}
              </h2>
              <p>{admin.bio}</p>
            </div>
          </Link>
        </div>
      ))}

      <p>
        Feel free to get in touch with the whole team by emailing us at NEEDTOMAKEEMAIL@VEGANPLUSBUTTER.COM
      </p>
    </>
  )
}

export default About
