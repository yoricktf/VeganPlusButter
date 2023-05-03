import Link from 'next/link'
import React from 'react'
import { useState, useEffect } from 'react'
import LargeBlogCard from '../../components/LargeBlogCard'

const BlogPosts = ({ posts, sortAndSlice, getAllPosts }) => {
  const [blogPosts, setBlogPosts] = useState([])
  const [currentBlogPosts, setCurrentBlogPosts] = useState([])
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    getAllPosts()
  }, [])

  useEffect(() => {
    const blogs = posts.filter(post => post.tags.includes('Blog Post') === true)
    setBlogPosts(blogs)
    setCounter(0)
    setCurrentBlogPosts(sortAndSlice(blogs, counter, counter + 5))
  }, [posts])

  useEffect(() => {
    setCurrentBlogPosts(sortAndSlice(blogPosts, counter, counter + 5))
  }, [counter])

  const changePage = (direction) => {
    if (direction === 'positive') {
      if (counter !== blogPosts.length - 5) {
        setCounter((count) => count + 5)
      } else {
        setCounter((count) => count)
      }
    } else if (direction === 'negative') {
      if (counter === 0) {
        setCounter(0)
      } else {
        setCounter((count) => count - 5)
      }
    }
  }

  return (
    <div className='bodySection'>
      <h1 className='subTitle'>BlogPosts</h1>
      {
        currentBlogPosts?.map((blogPost, index) => {
          return (
            <LargeBlogCard key={blogPost._id} blogPost={blogPost} />
          )
        })
      }
      <section className='paginationControls'>
        <div className='button' onClick={() => changePage('negative')}>prev</div>
        <p>{counter + 1} to {counter + 5} of {blogPosts.length}</p>
        <div className='button' onClick={() => changePage('positive')}>next</div>
      </section>
    </div>
  )
}

export default BlogPosts
