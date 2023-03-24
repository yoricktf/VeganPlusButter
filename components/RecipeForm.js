import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import NotAuthorized from "./NotAuthorized"
import ImageUpload from "./ImageUpload"


const RecipeForm = () => {
  const [uploadData, setUploadData] = useState();
  const [imageSrc, setImageSrc] = useState([]);
  const images = []
  const router = useRouter()
  const { data: session, status } = useSession()
  const [confirmedUser, setConfirmedUser] = useState()
  const [tags, setTags] = useState([])
  const [ingredients, setIngredients] = useState([''])
  const [methodSteps, setMethodSteps] = useState([''])
  const tagOptions = ['easy', 'intermediate', 'hard', 'vegan', 'vegetarian', 'healthy', 'quick', 'breakfast', 'lunch', 'snack', 'dinner', 'dessert', 'baking']

  function handleImageChange(e) {
    for (const file of e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc((imgs) => [...imgs, reader.result]);
      };
      reader.onerror = () => {
        console.log(reader.error);
      };
    }
  }

  async function handleImageSubmit(event) {
    event.preventDefault();

    const fileInput = document.querySelector("[type=file]").files;

    const formData = new FormData();

    for (let i = 0; i < fileInput.length; i++) {
      let file = fileInput[i];
      formData.append("file", file);
      formData.append('upload_preset', 'cyc4e2cm');

      const data = await fetch('https://api.cloudinary.com/v1_1/yozzza/image/upload', {
        method: "POST",
        body: formData
      }).then(r => r.json());

      images.push(data.secure_url)
      setUploadData(data);
    }
    setImageSrc(images);
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const date = new Date
    const formattedDate = date.toLocaleString()

    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);
    const wholePost = { ...productData, date: formattedDate, author: session.user.email, tags, method: methodSteps, ingredients, images: imageSrc }

    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(wholePost)
    })
    const data = await response.json()

    router.push(`/recipe/${data._id}`)
  }

  const addIngredient = () => {
    setIngredients([...ingredients, ''])
  }

  const updateIngredient = (input, index) => {
    const copy = ingredients.slice()
    copy[index] = input
    setIngredients(copy)
  }


  const addMethodStep = () => {
    setMethodSteps([...methodSteps, ''])
  }

  const updateMethod = (input, index) => {
    const copy = methodSteps.slice()
    copy[index] = input
    setMethodSteps(copy)
  }

  useEffect(() => {
    try {
      const checkIfAdmin = async () => {
        if (session) {
          const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(session.user),
          })
          const user = await response.json()
          setConfirmedUser(user[0])
        }
      }
      checkIfAdmin()
    } catch (error) {
      console.log(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  return (
    <>
      <h1>NewRecipe</h1>
      <ImageUpload
        uploadData={uploadData}
        imageSrc={imageSrc}
        onImageSubmit={handleImageSubmit}
        onImageChange={handleImageChange}
      // images={images}
      />
      <form className="postForm" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" id="title" />
        <label htmlFor="description">Description:</label>
        <textarea name="description" id="description" cols="30" rows="10"></textarea>
        <fieldset> <legend>Ingredients</legend>
          <ul>
            {ingredients.map((input, index) => {
              return (
                <li key={index}>
                  <input type="text" name="ingredient" onChange={e => updateIngredient(e.target.value, index)} />
                </li>
              )
            })}
          </ul>
          <button type="button" onClick={addIngredient}>add another ingredient</button>
        </fieldset>
        <fieldset><legend>Method</legend>
          <ol>
            {methodSteps.map((input, index) => {
              return (
                <li key={index}>
                  <textarea name="method" onChange={e => updateMethod(e.target.value, index)} />
                </li>
              )
            })}
          </ol>
          <button type="button" onClick={addMethodStep}>add another method step</button>
        </fieldset>
        <fieldset> <legend>tags</legend>
          {tagOptions.map((tag, index) => {
            return (

              <div key={index}>
                <input onChange={(e) => setTags([...tags, e.target.value])} value={tag} type="checkbox" />
                <label htmlFor={tag}>{tag}</label>
              </div>
            )
          })}
        </fieldset>
        <label htmlFor="difficulty">difficulty:</label>
        <input type="number" name="difficulty" id="difficulty" placeholder="1(easy)-5(hardest)" />
        <label htmlFor="prepTime">Prep Time:</label>
        <input type="number" name="prepTime" id="prepTime" placeholder="the amount of time it takes to prep this dish" />
        <label htmlFor="cookTime">Cook Time:</label>
        <input type="number" name="cookTime" id="cookTime" placeholder="the amount of time it takes to Cook this dish" />
        <label htmlFor="servingSize">Serving Size:</label>
        <input type="number" name="servingSize" id="servingSize" placeholder="Number of people this dish can serve" />
        <div>
          <label htmlFor="featured"> Featured</label>
          <input type="checkbox" name="featured" id="featured" value />
        </div>
        <button>Submit</button>
      </form>
    </>
  )
}

export default RecipeForm
