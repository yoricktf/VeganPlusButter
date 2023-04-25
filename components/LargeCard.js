import Image from "next/image"
import Link from "next/link"
import Tag from "./Tag"

const LargeCard = ({ recipeInfo, numberOfComments, comments }) => {
  const { title, images, tags, _id, numberOfFavorites } = recipeInfo
  const numberOfRecipeComments = (comments?.filter(comment => comment.post === _id)).length
  return (
    <Link href={`/recipe/${_id}`} className="largeCardLink">
      <article className="largeCard">
        {images.length < 1 ? <div className="largeCardImage">
          <Image
            src='https://res.cloudinary.com/yozzza/image/upload/v1682416352/veganPlusButter/blogpost_cwdhxu.avif'
            alt={`image of ${title}`}
            // width={150}
            // height={150}
            fill
            sizes="100%"
            style={{ objectFit: 'cover' }}
          />
        </div> :
          <div className="largeCardImage">
            <Image
              src={images[0]}
              alt={`image of ${title}`}
              // width={150}
              // height={150}
              fill
              sizes="100%"
              style={{ objectFit: 'cover' }}
            />
          </div>
        }
        <div className="largeCardDetails">
          <h2>{title}</h2>
          <div className="largeCardTags">
            {tags.map(tag => <Tag key={tag} tag={tag} />)}
          </div>
          <div className="details">
            <p className="detail">{numberOfRecipeComments} Comments</p>
            {/* <p className="detail">Favorited {numberOfFavorites} times</p> */}
          </div>

        </div>
      </article>
    </Link>
  )
}

export default LargeCard
