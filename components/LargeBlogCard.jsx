import Link from 'next/link'
import React from 'react'

const LargeBlogCard = ({ blogPost }) => {

  const { title, description, date } = blogPost

  const shortenedDescription = description.slice(0, 150)

  return (
    <Link href={`/recipe/${blogPost._id}`}>
      <h2>{title}</h2>
      <p className='detail'>By {blogPost.author.name}</p>
      <p className='detail'>{date}</p>
      <p>{shortenedDescription}...</p>
    </Link>
  )
}

export default LargeBlogCard
