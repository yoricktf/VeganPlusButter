import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import NotAuthorized from '../../../../components/NotAuthorized';
import LargeCard from '../../../../components/LargeCard';
import Comment from '../../../../components/Comment';
import Loading from '../../../../components/Loading';
import useSWR from 'swr';

const Index = ({ comments }) =>
  // { handleFetchSpecificUser }
  {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { id } = router.query;
    // const [specificUser, setSpecificUser] = useState();
    // const [filteredComments, setFilteredComments] = useState([]);

    const {
      data: filteredComments,
      error: errorComments,
      isLoading: loadingComments,
    } = useSWR(`/api/comments?type=User Comments&authorId=${id}`);

    const {
      data: specificUser,
      error: errorSpecificUser,
      isLoading: loadingSpecificUser,
    } = useSWR(`/api/user/${id}`);

    if (errorComments || errorSpecificUser) {
      return <div>failed to load</div>;
    }

    if (loadingComments || loadingSpecificUser) {
      return <Loading />;
    }

    // useEffect(() => {
    // setSpecificUser(handleFetchSpecificUser(id))
    // }, [id])
    const fetchUsersComments = async () => {
      if (id) {
        const response = await fetch('/api/comments');
        const comments = await response.json();
        const filteredComments = comments.filter(
          (comment) => comment.author._id === id
        );
        const sortedUsersComments = filteredComments.sort(function (a, b) {
          return a.createdAt > b.createdAt
            ? -1
            : a.createdAt < b.createdAt
            ? 1
            : 0;
        });
        setFilteredComments(sortedUsersComments);
      }
    };

    const fetchSpecficUser = async () => {
      if (id) {
        const response = await fetch(`/api/user/${id}`);
        const user = await response.json();
        setSpecificUser(user);
      }
    };

    // useEffect(() => {
    //   fetchSpecficUser();
    //   fetchUsersComments();
    // }, [id]);

    if (status === 'authenticated') {
      return (
        <section className='profilePage bodySection'>
          <div className='profileData'>
            {!!specificUser ? (
              <Image
                className='largeProfile'
                src={specificUser?.image}
                width={96}
                height={96}
                alt={`${specificUser?.name}'s profile picture`}
              />
            ) : null}
            <div>
              <h1>{specificUser?.name}&apos;s Profile</h1>
              <p>Bio: {specificUser?.bio}</p>
            </div>
          </div>
          {specificUser?.email === session.user.email ? (
            <Link className='button' href={`/profile/${specificUser._id}/edit`}>
              Edit your Profile
            </Link>
          ) : (
            ''
          )}
          <section className='usersFavorites'>
            <h2>{specificUser?.name}&apos;s Favorites</h2>
            {specificUser?.favorites?.map((favoritedRecipe, index) => {
              return (
                <LargeCard
                  key={index}
                  recipeInfo={favoritedRecipe}
                  comments={comments}
                />
              );
            })}
          </section>
          <section className='comments'>
            <h2>Comments</h2>
            {filteredComments.map((comment, index) => (
              <Comment
                key={index}
                userComment={comment}
                fetchUsersComments={fetchUsersComments}
              />
            ))}
          </section>
        </section>
      );
    } else {
      return <NotAuthorized />;
    }
  };

export default Index;
