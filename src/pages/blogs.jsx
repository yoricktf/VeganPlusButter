import React from 'react'
import { useState, useEffect } from 'react'

const BlogPosts = ({ posts }) => {
  const [blogPosts, setBlogPosts] = useState([])
  const [currentBlogPosts, setCurrentBlogPosts] = useState([])
  const [counter, setCounter] = useState(0)


  useEffect(() => {
    const blogs = posts.filter(post => post.tags.includes('Blog Post') === true)
    setBlogPosts(blogs)
    setCounter(blogs.length)
  }, [posts])

  console.log(counter)

  console.log(blogPosts)

  return (
    <div className='bodySection'>
      <h1 className='subTitle'>BlogPosts</h1>

      {
        blogPosts.map((post, index) => {
          return (
            <div key={post._id}>
              <h2>{post.title}</h2>
            </div>
          )
        })
      }

      {/* <div onClick={() => changeCounter('+')}>next</div> */}
      <div onClick={() => setCounter(prevValue => (prevValue - 2))}>prev</div>
      <div onClick={() => setCounter(prevValue => (prevValue + 2))}>next</div>


    </div>
  )
}

export default BlogPosts
