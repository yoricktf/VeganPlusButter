import Image from "next/image"
import Link from "next/link"

const LargeCard = ({ recipeInfo }) => {
  const { title, images, tags, _id, numberOfComments, numberOfFavorites } = recipeInfo

  return (
    <Link href={`recipe/${_id}`} className="largeCard card">
      <article >
        <Image src={images[0]} alt={`image of ${title}`} width={150} height={150} />
        <h1>{title}</h1>
        {tags.map(tag => <p key={tag} className={`tag ${tag}`}>{tag}</p>)}
        <div className="details">
          <p className="detail">{numberOfComments} comments</p>
          <p className="detail">Favorited {numberOfFavorites} times</p>
        </div>
      </article>
    </Link>
  )
}

export default LargeCard
