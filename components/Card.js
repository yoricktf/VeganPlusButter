import Image from "next/image"
const Card = ({ title, image, tags }) => {
  return (
    <div className="card">
      <Image
        src={image}
        alt="recipe image"
        width={300}
        height={300}
      />
      <h2>{title}</h2>
      <div className="tags">
        {tags.map((tag, index) => {
          return (<p key={index} className="tag">{tag}</p>)
        })}
      </div>
    </div>
  )
}

export default Card
