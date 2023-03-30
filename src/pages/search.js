import LargeCard from "../../components/LargeCard"
import NothingFound from "../../components/nothingFound"
import { useState } from 'react'

const Search = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase())
  }

  const filteredPosts = searchQuery.length > 0
    ? posts.filter(post => {
      return (post.title.toLowerCase()).includes(searchQuery)
        || (post.tags.map(tag => tag.toLowerCase())).includes(searchQuery)
        || (post.ingredients.map(ingredient => ingredient.toLowerCase())).includes(searchQuery)
    }) : []

  console.log('--------------', filteredPosts)

  if (!!posts) {
    return (
      <>
        <div className="bodySection">
          <section id="searchSection" >
            <h1>Search</h1>
            <input type="text" id="search" onChange={handleSearch} placeholder="cookies, healthy, butter" autoFocus />
            <p className="detail">Search through recipe titles, tags or ingredients</p>
          </section>
          {filteredPosts.length === 0 && searchQuery.length ?
            <NothingFound />
            :
            filteredPosts.map(foundPost => {
              return (
                <LargeCard key={foundPost._id} recipeInfo={foundPost} />
              )
            })

          }
        </div>
      </>
    )
  }
  return <h1>Loading</h1>
}

export default Search
