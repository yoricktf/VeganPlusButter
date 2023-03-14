import Image from "next/image"
import Link from "next/link"
const Card = ({ title, image, tags, postId }) => {
  return (
    <Link href={`recipe/${postId}`} className="card">
      <Image
        src={image}
        alt="recipe image"
        width={300}
        height={300}
      />
      <h2>{title}</h2>
      <div className="tags">
        {tags.map(tag => (<p key={tag} className={`tag ${tag}`}>{tag}</p>))}
      </div>
    </Link>
  )
}

export default Card
