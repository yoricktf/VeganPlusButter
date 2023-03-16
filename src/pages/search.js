import LargeCard from "../../components/LargeCard"
import { useState } from 'react'

const Search = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState()

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase())
  }

  if (!!posts) {
    return (
      <>
        <h1>Search</h1>
        <input type="text" onChange={handleSearch} placeholder="cookies, healthy, butter" />
        <p className="detail">Search through recipe titles, tags or ingredients</p>
        {posts.filter(post => {
          return (post.title.toLowerCase()).includes(searchQuery)
            || (post.tags.map(tag => tag.toLowerCase())).includes(searchQuery)
            || (post.ingredients.map(ingredient => ingredient.toLowerCase())).includes(searchQuery)
        }).map(foundPost => {
          return (
            <LargeCard key={foundPost._id} recipeInfo={foundPost} />
          )
        })}
      </>
    )
  }
  return <h1>Loading</h1>
}

export default Search
