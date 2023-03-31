import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import NotAuthorized from "./NotAuthorized"
import ImageUpload from "./ImageUpload"


const RecipeForm = ({ onSubmit, recipeValue, editMode }) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [recipe, setRecipe] = useState(recipeValue)
  const [uploadData, setUploadData] = useState();
  const [imageSrc, setImageSrc] = useState(recipeValue ? [...recipe.images] : []);
  const [ingredients, setIngredients] = useState(recipeValue ? [...recipe.ingredients] : [''])
  const [methodSteps, setMethodSteps] = useState(recipeValue ? [...recipe.method] : [''])
  const [tags, setTags] = useState([])
  const images = []
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

  const toggleTags = (event) => {
    const name = event.target.name

    const array = recipe?.tags?.slice() || []

    if (recipe?.tags?.includes(name)) {
      const filtered = array.filter(tag => tag !== name)
      setRecipe({ ...recipe, tags: filtered })
      console.log(filtered)
    } else {
      array.push(name)
      setRecipe({ ...recipe, tags: array })
    }
  }

  return (
    <section className="bodySection">
      <h1 id="formTitle">{!!editMode ? 'EditRecipe' : 'NewRecipe'}</h1>
      <ImageUpload
        uploadData={uploadData}
        imageSrc={imageSrc}
        onImageSubmit={handleImageSubmit}
        onImageChange={handleImageChange}
      />
      <form className="postForm" onSubmit={e => onSubmit(e, recipe, ingredients, methodSteps, session.user.id, imageSrc)}>
        {/* <form className="postForm" onSubmit={handleSubmit}> */}
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" id="title" value={recipe?.title} onChange={e => setRecipe(currentRecipe => ({ ...currentRecipe, title: e.target.value }))} />
        <label htmlFor="description">Description:</label>
        <textarea name="description" id="description" cols="30" rows="10" value={recipe?.description} onChange={e => setRecipe(currentRecipe => ({ ...currentRecipe, description: e.target.value }))}></textarea>
        <fieldset> <legend>Ingredients</legend>
          <ul>
            {ingredients.map((input, index) => {
              return (
                <li key={index}>
                  <input type="text" onChange={e => updateIngredient(e.target.value, index)} value={input} />
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
                  <textarea name="method" onChange={e => updateMethod(e.target.value, index)} value={input} />
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
                <input
                  // onChange={(e) => setRecipe({ ...recipe, tags: [...recipe?.tags, e.target.value] })}
                  onChange={e => toggleTags(e)}
                  name={tag}
                  checked={recipe?.tags?.includes(tag) ? true : false}
                  value={tag}
                  type="checkbox" />
                <label htmlFor={tag}>{tag}</label>
              </div>
            )
          })}
        </fieldset>
        <fieldset className="formFeatures"> <legend>Recipe Details</legend>
          <label htmlFor="difficulty">difficulty:</label>
          <input type="number" name="difficulty" id="difficulty" min={1} max={5} placeholder="1(easy)-5(hardest)" value={recipe?.difficulty} onChange={e => setRecipe(currentRecipe => ({ ...currentRecipe, difficulty: e.target.value }))} />
          <label htmlFor="prepTime">Prep Time:</label>
          <input type="number" name="prepTime" id="prepTime" placeholder="the amount of time it takes to prep this dish" value={recipe?.prepTime} onChange={e => setRecipe(currentRecipe => ({ ...currentRecipe, prepTime: e.target.value }))} />
          <label htmlFor="cookTime">Cook Time:</label>
          <input type="number" name="cookTime" id="cookTime" placeholder="the amount of time it takes to Cook this dish" value={recipe?.cookTime} onChange={e => setRecipe(currentRecipe => ({ ...currentRecipe, cookTime: e.target.value }))} />
          <label htmlFor="servingSize">Serving Size:</label>
          <input type="number" name="servingSize" id="servingSize" placeholder="Number of people this dish can serve" value={recipe?.servingSize} onChange={e => setRecipe(currentRecipe => ({ ...currentRecipe, servingSize: e.target.value }))} />
          <div>
            <label htmlFor="featured"> Featured</label>
            <input
              type="checkbox"
              name="featured"
              id="featured"
              value
              onChange={(e) => setRecipe({ ...recipe, featured: e.target.checked })}
              checked={recipe?.featured ? true : false}
            />
          </div>
        </fieldset>

        <button className="submit button">
          {editMode ? "Edit Recipe" : "Submit Recipe"}
        </button>
      </form>
    </section>
  )
}

export default RecipeForm
