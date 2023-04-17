import Image from "next/image"
import Link from "next/link"


const Comment = ({ userComment }) => {
  const { comment, date, author, _id } = userComment

  const deleteComment = async (id) => {
    console.log('----------response', id)
    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    })
    const data = await response.json()
    console.log(data)
  }


  return (
    <article className="comment">
      <div>
        <Link href={`/profile/${author._id}`}>
          <Image className="profile" src={author.image} width={30} height={30} alt={`Profile picture of ${author.name}`} />
          <p>{author.name}</p>
        </Link>
      </div>
      <p>{date}</p>
      <p>{comment}</p>
      <p onClick={() => deleteComment(_id)}>Delete Comment</p>
    </article>
  )
}

export default Comment
