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

  return (
    <div className='bodySection aboutSection'>
      <h1 className='subTitle'>Vegan Plus Butter</h1>
      <p>Vegan plus butter is a simple website to showcase reciepes from our contributers, feel free to check them out and see what they have favorited and commented on.</p>
      <div className='adminProfiles'>
        {admins.map(admin => (
          <div key={admin._id} className='card adminCard'>
            <Link href={`/profile/${admin._id}`}>
              <Image
                src={admin.image}
                alt={`${admin.name}'s profile picture`}
                className='squareProfile'

                height={100}
                width={80} />
              <h2>
                {admin.name}
              </h2>
            </Link>
            <p>{admin.bio}</p>
          </div>
        ))}

      </div>
    </div>
  )
}

export default About
