import { useEffect } from 'react';

const CommentForm = ({ recipeId, userId, fetchComments }) => {
  const addComment = async (event) => {
    const date = new Date();
    const formattedDate = date.toLocaleString();
    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);
    const completeComment = {
      ...productData,
      date: formattedDate,
      author: userId,
      post: recipeId,
    };
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify(completeComment),
    });
    const comment = await response.json();
  };

  // useEffect(() => {
  //   fetchComments()
  // }, [])

  return (
    <form className='commentForm' onSubmit={addComment}>
      <label htmlFor=''>Leave a comment:</label>
      <textarea name='comment' id='commentInput' cols='5' rows='5'></textarea>
      <button className='commentButton button'>Submit Your Comment</button>
    </form>
  );
};

export default CommentForm;
