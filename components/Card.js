import Image from "next/image"
import Link from "next/link"
import Tag from "./Tag"
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
        {tags.map(tag => <Tag key={tag} tag={tag} />)}
      </div>
    </Link>
  )
}

export default Card
