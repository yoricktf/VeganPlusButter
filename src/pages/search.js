import LargeCard from '../../components/LargeCard';
import Loading from '../../components/Loading';
import NothingFound from '../../components/nothingFound';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

const Search = ({ comments }) => {
  const [searchQuery, setSearchQuery] = useState('');
  // const [comments, setComments] = useState([])

  // const getComments = async () => {
  //   const response = await fetch(`/api/comments`)
  //   const comments = await response.json()
  //   setComments(comments)
  // }
  const { data: posts, error, isLoading } = useSWR('/api?type=Populated');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  if (error) {
    return <div>failed to load</div>;
  }

  if (isLoading) {
    return <Loading />;
  }
  // useEffect(() => {
  //   getComments()
  // }, [])

  const filteredPosts =
    searchQuery.length > 0
      ? posts.filter((post) => {
          return (
            post.title.toLowerCase().includes(searchQuery) ||
            post.tags.map((tag) => tag.toLowerCase()).includes(searchQuery) ||
            post.ingredients
              .map((ingredient) => ingredient.toLowerCase())
              .includes(searchQuery)
          );
        })
      : [];

  if (!!posts) {
    return (
      <>
        <div className='bodySection'>
          <section id='searchSection'>
            <h1>Search</h1>
            <input
              type='text'
              id='search'
              onChange={handleSearch}
              placeholder='cookies, healthy, butter'
              autoFocus
            />
            <p className='detail'>
              Search through recipe titles, tags or ingredients
            </p>
          </section>
          {filteredPosts.length === 0 && searchQuery.length ? (
            <NothingFound />
          ) : (
            filteredPosts.map((foundPost) => {
              {
                /* const numberOfRecipeComments = (comments.filter(comment => comment.post === foundPost._id)).length */
              }
              return (
                <LargeCard
                  key={foundPost._id}
                  recipeInfo={foundPost}
                  comments={comments}
                />
              );
            })
          )}
        </div>
      </>
    );
  }
  return <h1>Loading...</h1>;
};

export default Search;
