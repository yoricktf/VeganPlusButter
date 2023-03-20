import Image from "next/image"
import Link from "next/link"
import Tag from "./Tag"
const Card = ({ title, image, tags, postId }) => {
  return (
    <Link href={`recipe/${postId}`} >
      <div className="card">
        <div className="layer ">
          <Image
            className="cardImage"
            src={image}
            alt="recipe image"
            fill
            sizes="100%"
            style={{ objectFit: 'cover' }}

          />
          <h2 className="cardTitle">{title}</h2>
          <div className="cardTags">
            {tags.map(tag => <Tag key={tag} tag={tag} />)}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card
