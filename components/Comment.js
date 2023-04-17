import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"


const Comment = ({ userComment, fetchUsersComments, fetchRecipeComments }) => {
  const { comment, date, author, _id } = userComment
  const { data: session, status } = useSession()

  const deleteComment = async (id) => {
    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    })
    const data = await response.json()
    console.log(data)
    !!fetchUsersComments ? fetchUsersComments() : fetchRecipeComments()
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
      {author._id === session?.user.id && (<p onClick={() => deleteComment(_id)}>Delete Comment</p>)}
    </article>
  )
}

export default Comment
