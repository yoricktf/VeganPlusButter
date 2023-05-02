import React from 'react'
import { useState, useEffect } from 'react'

const BlogPosts = ({ posts, sortAndSlice }) => {
  const [blogPosts, setBlogPosts] = useState([])
  const [currentBlogPosts, setCurrentBlogPosts] = useState([])
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const blogs = posts.filter(post => post.tags.includes('Blog Post') === true)
    setBlogPosts(blogs)
    setCurrentBlogPosts(sortAndSlice(blogs, counter, counter + 2))
  }, [posts])

  const changePage = (direction, startingPoint) => {
    if (direction === 'positive') {
      if (counter !== blogPosts.length - 2) {
        setCounter((count) => count + 2)
      } else {
        setCounter((count) => count)
      }
    } else if (direction === 'negative') {
      if (counter === 0) {
        setCounter(0)
      } else {
        setCounter((count) => count - 2)
      }
    }
  }

  useEffect(() => {
    setCurrentBlogPosts(sortAndSlice(blogPosts, counter, counter + 2))
  }, [counter])

  return (
    <div className='bodySection'>
      <h1 className='subTitle'>BlogPosts</h1>
      {
        currentBlogPosts?.map((post, index) => {
          return (
            <div key={post._id}>
              <h2>{post.title}</h2>
            </div>
          )
        })
      }
      <div onClick={() => changePage('negative')}>prev</div>
      <div onClick={() => changePage('positive')}>next</div>
    </div>
  )
}

export default BlogPosts
