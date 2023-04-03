import Image from "next/image"
import Link from "next/link"


const Comment = ({ userComment }) => {
  const { comment, date, author } = userComment

  return (
    <Link href={`/profile/${author._id}`}>
      <article className="comment">
        <div>
          <Image className="profile" src={author.image} width={30} height={30} alt={`Profile picture of ${author.name}`} />
          <p>{author.name}</p>
        </div>
        <p>{date}</p>
        <p>{comment}</p>
      </article>
    </Link>
  )
}

export default Comment
