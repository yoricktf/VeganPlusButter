import Image from "next/image"
import Link from "next/link"
import Tag from "./Tag"
const Card = ({ title, image, tags, postId }) => {
  return (
    <Link href={`recipe/${postId}`}>
      <article className="recipeCard">
        <div className="layer">
          <Image
            className="cardImage"
            src={image}
            alt="recipe image"
            fill
            sizes="100%"
            style={{ objectFit: 'cover' }}
          />
          <div className="cardTags">
            {tags.map(tag => <Tag key={tag} tag={tag} />)}
          </div>
        </div>
        <h2 className="cardTitle">{title}</h2>
      </article>
    </Link>
  )
}

export default Card
