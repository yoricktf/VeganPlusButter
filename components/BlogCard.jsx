import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const BlogCard = ({ blogPost }) => {
  const { title, description, date, author, _id } = blogPost
  const shortenedDescription = description.slice(0, 150)

  return (
    <article className='blogCard'>
      <Link href={`/recipe/${_id}`}>
        <h1>{title}</h1>
      </Link>
      <Link href={`/profile/${author._id}`} className='authorDetails'>
        {/* <Image
          className="profile"
          src={author?.image}
          height={20}
          width={20}
          alt={`profile picture for ${author?.name}`}
        /> */}
        <p className='detail'>by {author.name} </p>
        <p className='detail'>{date}</p>
      </Link>

      <p>{shortenedDescription}...</p><Link href={`/recipe/${_id}`}><p className='readMore'>Read more</p></Link>
    </article>
  )
}

export default BlogCard
