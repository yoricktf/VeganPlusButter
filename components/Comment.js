
const Comment = ({ userComment }) => {
  const { comment, date, author } = userComment



  return (
    <article className="comment">
      <p>{comment}</p>
      <p>{date}</p>
      <p>{author.name}</p>
    </article>
  )
}

export default Comment
