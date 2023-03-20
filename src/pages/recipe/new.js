import React from 'react'

const NewRecipe = () => {

  // need to add the date
  // need to upload images
  //reference the author

  return (
    <form action="">
      <div>NewRecipe</div>
      <label htmlFor="title">Title</label>
      <input type="text" for="title" id="title" />
      <label htmlFor="description">Description</label>
      <textarea name="description" id="description" cols="30" rows="10"></textarea>
      <fieldset>Ingredients
        <label htmlFor="ingredient">Ingredient</label>
        <input type="text" for="ingredient" id="ingredient" />
      </fieldset>
      <fieldset>Method
        <label htmlFor="method">Method</label>
        <input type="text" for="method" id="method" />
      </fieldset>
      <label htmlFor="featured">Featured</label>
      <input type="checkbox" name="featured" id="featured" />
      <fieldset>tags
        <label htmlFor=""></label>
        <input type="checkbox" name="" id="" />
        <label htmlFor=""></label>
        <input type="checkbox" name="" id="" />
        <label htmlFor=""></label>
        <input type="checkbox" name="" id="" />
        <label htmlFor=""></label>
        <input type="checkbox" name="" id="" />
        <label htmlFor=""></label>
        <input type="checkbox" name="" id="" />
        <label htmlFor=""></label>
        <input type="checkbox" name="" id="" />
        <label htmlFor=""></label>
        <input type="checkbox" name="" id="" />
        <label htmlFor=""></label>
        <input type="checkbox" name="" id="" />
        <label htmlFor=""></label>
        <input type="checkbox" name="" id="" />
        <label htmlFor=""></label>
        <input type="checkbox" name="" id="" />
        <label htmlFor=""></label>
        <input type="checkbox" name="" id="" />
        <label htmlFor=""></label>
        <input type="checkbox" name="" id="" />
      </fieldset>
      <label htmlFor="difficulty">difficulty:</label>
      <input type="number" name="difficulty" id="difficulty" />
      <label htmlFor="cookTime">Cook Time:</label>
      <input type="number" name="cookTime" id="cookTime" />
      <label htmlFor="prepTime">Prep Time:</label>
      <input type="number" name="prepTime" id="prepTime" />
      <label htmlFor="servingSize">Serving Size:</label>
      <input type="number" name="servingSize" id="servingSize" />
      <button>Submit</button>
    </form>
  )
}

export default NewRecipe
