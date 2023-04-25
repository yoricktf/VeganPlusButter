import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const BlogCard = ({ blogPost }) => {
  const { title, description, date, author, _id } = blogPost
  const shortenedDescription = description.slice(0, 150)

  return (
    <article>
      <Image
        className="profile"
        src={author?.image}
        height={30}
        width={30}
        alt={`profile picture for ${author?.name}`}
      />


      <Link href={`/recipe/${_id}`}>
        <h1>{title}</h1>
      </Link>
      <p className='detail'>{date}</p>
      <p>{shortenedDescription}...</p>
    </article>
  )
}

export default BlogCard
