import Link from 'next/link';
import React from 'react';

const LargeBlogCard = ({ blogPost }) => {
  const { title, description, date } = blogPost;
  const shortenedDescription = description.slice(0, 150);

  // const observer = new IntersectionObserver((blogPosts) => {
  //   blogPosts.forEach((blogPost) => {
  //     if (blogPost.isIntersecting) {
  //       blogPost.target.classList.add('show');
  //     } else {
  //       blogPost.target.classList.remove('show');
  //     }
  //   });
  // });

  // const hiddenBlogPosts = document.querySelectorAll('.largeBlogCard');
  // hiddenBlogPosts.forEach((blogpost) => observer.observe(blogpost));

  return (
    <article className='largeBlogCard'>
      <Link href={`/recipe/${blogPost._id}`}>
        <h2>{title}</h2>
      </Link>
      <Link href={`/profile/${blogPost.author._id}`}>
        <p className='detail'>By {blogPost.author.name}</p>
      </Link>
      <p className='detail'>{date}</p>
      <Link href={`/recipe/${blogPost._id}`}>
        <div dangerouslySetInnerHTML={{ __html: shortenedDescription }}></div>
        Read More
      </Link>
    </article>
  );
};

export default LargeBlogCard;
