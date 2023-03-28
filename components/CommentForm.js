

const CommentForm = ({ recipeId, userId }) => {


  const addComment = async (event) => {

    const date = new Date
    const formattedDate = date.toLocaleString()
    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);
    const completeComment = { ...productData, date: formattedDate, author: userId, post: recipeId }
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify(completeComment)
    })

    const comment = await response.json()

  }

  return (
    <form className='commentForm' onSubmit={addComment}>
      <label htmlFor="">Leave a comment:</label>
      <textarea name="comment" id="commentInput" cols="50" rows="5"></textarea>
      <button className="commentButton">Submit Your Comment</button>
    </form>
  )
}

export default CommentForm
