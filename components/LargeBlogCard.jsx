import Link from 'next/link'
import React from 'react'

const LargeBlogCard = ({ blogPost }) => {

  const { title, description, date } = blogPost

  const shortenedDescription = description.slice(0, 150)

  return (
    <article className='LargeBlogCard'>
      <Link href={`/recipe/${blogPost._id}`}>
        <h2>{title}</h2>
      </Link>
      <Link href={`/profile/${blogPost.author._id}`}>
        <p className='detail'>By {blogPost.author.name}</p>
      </Link>
      <p className='detail'>{date}</p>
      <Link href={`/recipe/${blogPost._id}`}>
        <p>{shortenedDescription}...</p>
        Read More
      </Link>
    </article>
  )
}

export default LargeBlogCard
