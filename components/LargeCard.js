import Image from "next/image"
import Link from "next/link"
import Tag from "./Tag"

const LargeCard = ({ recipeInfo }) => {
  const { title, images, tags, _id, numberOfComments, numberOfFavorites } = recipeInfo

  return (
    <Link href={`/recipe/${_id}`} className="largeCardLink">
      <article className="largeCard">
        <Image src={images[0]} alt={`image of ${title}`} width={150} height={150} />
        <div className="largeCardDetails">
          <h2>{title}</h2>
          <div className="largeCardTags">
            {tags.map(tag => <Tag key={tag} tag={tag} />)}
          </div>
          <div className="details">
            <p className="detail">{numberOfComments} comments</p>
            <p className="detail">Favorited {numberOfFavorites} times</p>
          </div>

        </div>
      </article>
    </Link>
  )
}

export default LargeCard
