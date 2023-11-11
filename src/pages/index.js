import Card from '../../components/Card';
import Component from '../../components/Login-btn';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import BlogCard from '../../components/BlogCard';
import useSWR from 'swr';

export default function Home() {
  const [confirmedUser, setConfirmedUser] = useState();
  const { data: session, status } = useSession();

  const {
    data: newestPosts,
    error: errorNewestPosts,
    isLoading: loadingNewestPosts,
  } = useSWR('/api?type=Newest Post');
  const {
    data: blogPosts,
    error: errorBlogPosts,
    isLoading: loadingBlogPosts,
  } = useSWR('/api?type=Blog Post');
  const {
    data: featuredFive,
    error: errorFeatured,
    isLoading: loadingFeatured,
  } = useSWR('/api?type=Featured');
  const {
    data: timeRelevantInfo,
    error: errorTimeRelevant,
    isLoading: loadingTimeRelevant,
  } = useSWR('/api?type=Daytime');

  useEffect(() => {
    if (session) {
      const checkIfAdmin = async () => {
        try {
          const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(session.user),
          });
          const user = await response.json();
          setConfirmedUser(user[0]);
        } catch (error) {
          console.log(error);
        }
      };

      checkIfAdmin();
    }
  }, [session]);

  if (
    errorBlogPosts ||
    errorFeatured ||
    errorNewestPosts ||
    errorTimeRelevant
  ) {
    return <div>failed to load</div>;
  }

  if (
    loadingNewestPosts ||
    loadingFeatured ||
    loadingBlogPosts ||
    loadingTimeRelevant
  ) {
    return <div>loading...</div>;
  }

  return (
    <>
      <section className='bodySection'>
        {newestPosts.length > 0 && (
          <section id='newestPosts'>
            <div className='imageContainer'>
              <Link href={`recipe/${newestPosts[0]._id}`}>
                <p>Latest Recipe</p>
                <Image
                  src={newestPosts[0].images[0]}
                  alt={'Newest Post'}
                  fill
                  sizes='60%'
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </Link>
            </div>
            <div>
              <div className='imageContainer'>
                <Link href={`recipe/${newestPosts[1]._id}`}>
                  <Image
                    src={newestPosts[1].images[0]}
                    alt={'Second newest Post'}
                    fill
                    sizes='60%'
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </Link>
              </div>
              <div className='imageContainer'>
                <Link href={`recipe/${newestPosts[2]._id}`}>
                  <Image
                    src={newestPosts[2].images[0]}
                    alt={'Third Newest Post'}
                    fill
                    sizes='60%'
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </Link>
              </div>
            </div>
          </section>
        )}
        <div className='blurb'>
          <h1 className='title'>VEGAN PLUS BUTTER</h1>
          <p>
            Vegan Plus Butter started out as a place for me to write Vegan
            recipes, but then morphed into adding butter to recipes because I
            enjoy the depth of flavour it can add to certain dishes. Everything
            on this website can be made vegan though without sacrificing the
            taste in any way. I hope you enjoy using it as much as I do!
          </p>
        </div>
      </section>
      <section>
        <h2 className='subTitle'>Featured Recipes</h2>
        <div className='horizontalSection '>
          {featuredFive.map((post) => {
            return (
              <Card
                key={post._id}
                title={post.title}
                image={post.images[0]}
                tags={post.tags}
                postId={post._id}
              />
            );
          })}
        </div>
      </section>
      <section className='bodySection blogSection'>
        <h1 className='subTitle'>Blog Posts</h1>
        <div className='blogPosts'>
          {blogPosts.map((blogPost) => {
            return <BlogCard key={blogPost._id} blogPost={blogPost} />;
          })}
          <article className='blogCard blogLink'>
            <Link href={`/blogs`}>
              <h2 className='subTitle'>See All Blog Posts</h2>
            </Link>
          </article>
        </div>
      </section>
      <section>
        <h2 className='subTitle'>{timeRelevantInfo.slogan}</h2>
        <div className='horizontalSection '>
          {timeRelevantInfo.posts.map((post) => {
            return (
              <Card
                key={post._id}
                title={post.title}
                image={post.images[0]}
                tags={post.tags}
                postId={post._id}
              />
            );
          })}
        </div>
      </section>
      {status === 'authenticated' &&
      confirmedUser &&
      confirmedUser.admin === true ? (
        <Link className='new button' href={'/recipe/new'}>
          ➕
        </Link>
      ) : (
        ''
      )}
    </>
  );
}
