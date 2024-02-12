import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Tag from '../../../components/Tag';
import CommentForm from '../../../components/CommentForm';
import { useSession, signIn } from 'next-auth/react';
import Comment from '../../../components/Comment';
import starOutline from '../../../public/starOutline.png';
import starFilled from '../../../public/starFilled.png';
import Link from 'next/link';
import useSWR from 'swr';
import Loading from '../../../components/Loading';

const ShowPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  // const [specificPost, setSpecficPost] = useState();
  // const [specificUser, setSpecificUser] = useState({});
  // const [comments, setComments] = useState([])
  const [userFavorites, setUserFavorites] = useState([]);
  const { id } = router.query;

  const {
    data: comments,
    error: errorComments,
    isLoading: loadingComments,
  } = useSWR(`/api/comments?type=Recipe Comments&postId=${id}`);

  const {
    data: specificPost,
    error: errorSpecificPost,
    isLoading: loadingSpecificPost,
  } = useSWR(`/api/post/${id}`);

  const {
    data: specificUser,
    error: errorSpecificUser,
    isLoading: loadingSpecificUser,
  } = useSWR(`/api/user/${session?.user.id}`);

  useEffect(() => {
    if (session) {
      const checkFavorites = async () => {
        const response = await fetch('/api/favorite', {
          method: 'POST',
          body: session.user.id,
        });
        const favorites = await response.json();
        setUserFavorites(favorites);
      };
      checkFavorites();
    }
  }, [session]);

  if (errorComments || errorSpecificPost || errorSpecificUser) {
    return <div>failed to load</div>;
  }

  if (loadingComments || loadingSpecificPost || loadingSpecificUser) {
    return <Loading />;
  }

  // useEffect(() => {
  //   if (!!id) {
  //     const fetchSpecficRecipe = async () => {
  //       const response = await fetch(`/api/post/${id}`);
  //       const specificPost = await response.json();
  //       setSpecificPost(specificPost);
  //     };
  //     fetchSpecficRecipe();
  //   }
  // }, [id]);

  // const fetchComments = async () => {
  //   const response = await fetch('/api/comments');
  //   const comments = await response.json();
  //   const filteredComments = comments.filter((comment) => comment.post === id);

  //   const sortedComments = filteredComments.sort(function (a, b) {
  //     return a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0;
  //   });

  //   setComments(sortedComments);
  // };
  // useEffect(() => {
  //   fetchComments();
  // }, []);

  const toggleFavorite = async () => {
    const favoritesInfo = { userId: session.user.id, postId: id };

    const response = await fetch('/api/favorite', {
      method: 'PATCH',
      body: JSON.stringify(favoritesInfo),
    });
    const userFavorites = await response.json();
    setUserFavorites(userFavorites);
  };

  // useEffect(() => {
  //   if (session) {
  //     const fetchSpecficUser = async () => {
  //       const response = await fetch(`/api/user/${session.user.id}`);
  //       const user = await response.json();
  //       setSpecificUser(user);
  //     };
  //     fetchSpecficUser();
  //   }
  //   // setSpecificUser(handleFetchSpecificUser(id))
  // }, [session]);

  const handleDelete = async () => {
    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    });
    router.push('/');
  };

  if (!!specificPost) {
    const {
      title,
      method,
      ingredients,
      date,
      description,
      prepTime,
      cookTime,
      tags,
      images,
      servingSize,
    } = specificPost;
    return (
      <section className='bodySection'>
        {images.length > 0 ? (
          <div id='recipeShowImageContainer'>
            {/* <h1>{title}</h1> */}
            <Image
              id='recipeShowImage'
              src={images[0]}
              alt={`image of ${title}`}
              fill
              sizes='100%'
              style={{ objectFit: 'cover' }}
            />
          </div>
        ) : null}
        <section id='showPageBody'>
          <h1>{title}</h1>
          <div className='tags'>
            {tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
          {status === 'authenticated' && specificUser.admin ? (
            <div className='adminControls'>
              <Link className='edit button' href={`/recipe/${id}/edit`}>
                Edit Recipe
              </Link>
              <p className='delete button' onClick={handleDelete}>
                Delete Recipe
              </p>
            </div>
          ) : null}
          {status === 'authenticated' && userFavorites ? (
            userFavorites.includes(id) ? (
              <Image
                className='favoriteIcon'
                onClick={toggleFavorite}
                src={starFilled}
                width={30}
                height={30}
                alt='outline of a star'
              />
            ) : (
              <Image
                className='favoriteIcon'
                onClick={toggleFavorite}
                src={starOutline}
                width={30}
                height={30}
                alt='outline of a star'
              />
            )
          ) : (
            <div className='favoritesSection'>
              <Image
                className='favoriteIcon'
                src={starFilled}
                width={30}
                height={30}
                alt='filled star'
              />
              <p onClick={() => signIn('google')}>sign in to save favorites</p>
            </div>
          )}
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
          {ingredients.length > 0 ? (
            <>
              <h2>Ingredients</h2>
              <ul>
                {ingredients.map((ingredient, index) => {
                  return <li key={index}>{ingredient}</li>;
                })}
              </ul>
            </>
          ) : null}
          {method.length > 0 ? (
            <>
              <h2>Method</h2>
              <ol>
                {method.map((step, index) => {
                  return <li key={index}>{step}</li>;
                })}
              </ol>
            </>
          ) : null}
        </section>

        {status === 'authenticated' ? (
          <CommentForm
            recipeId={id}
            userId={session.user.id}
            // fetchComments={fetchComments}
          />
        ) : (
          <p className='commentSignIn button' onClick={() => signIn('google')}>
            Sign in to leave comments
          </p>
        )}
        <section className='comments'>
          {comments.map((comment, index) => {
            return (
              <Comment
                key={index}
                userComment={comment}
                // fetchRecipeComments={fetchComments}
              />
            );
          })}
        </section>
      </section>
    );
  }

  return (
    <>
      <h1>Loading...</h1>
    </>
  );
};

export default ShowPage;
