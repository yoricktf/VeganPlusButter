import Link from 'next/link';
import React from 'react';
import { useState, useEffect } from 'react';
import LargeBlogCard from '../../components/LargeBlogCard';
import useSWR from 'swr';
import Loading from '../../components/Loading';

const BlogPosts = ({}) => {
  const [page, setPage] = useState(1);

  const {
    data: blogPosts,
    isLoading,
    error,
  } = useSWR(`/api?type=All Blogs&page=${page}`);

  if (error) {
    return <div>failed to load</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (blogPosts.length === 0) {
    setPage((page) => page - 1);
  }

  const changePage = (direction) => {
    if (direction === 'positive') {
      if (page !== blogPosts.length - 5) {
        setPage((count) => count + 1);
      } else {
        setPage((count) => count);
      }
    } else if (direction === 'negative') {
      if (page === 1) {
        setPage(1);
      } else {
        setPage((count) => count - 1);
      }
    }
  };

  return (
    <div className='bodySection'>
      <h1 className='subTitle'>BlogPosts</h1>
      {/* {currentBlogPosts?.map((blogPost, index) => { */}
      {blogPosts?.map((blogPost, index) => {
        return <LargeBlogCard key={blogPost._id} blogPost={blogPost} />;
      })}
      <section className='paginationControls'>
        <div className='button' onClick={() => changePage('negative')}>
          prev
        </div>
        {/* <p>
          {counter + 1} to {counter + currentBlogPosts.length} of{' '}
          {blogPosts.length}
        </p> */}
        <p>Page {page}</p>
        <div className='button' onClick={() => changePage('positive')}>
          next
        </div>
      </section>
    </div>
  );
};

export default BlogPosts;
