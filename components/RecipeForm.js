import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NotAuthorized from './NotAuthorized';
import ImageUpload from './ImageUpload';

const RecipeForm = ({ onSubmit, recipeValue, editMode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [recipe, setRecipe] = useState(recipeValue);
  const [uploadData, setUploadData] = useState();
  const [imageSrc, setImageSrc] = useState(
    recipeValue ? [...recipe.images] : []
  );
  const [ingredients, setIngredients] = useState(
    recipeValue ? [...recipe.ingredients] : ['']
  );
  const [methodSteps, setMethodSteps] = useState(
    recipeValue ? [...recipe.method] : ['']
  );
  // const [tags, setTags] = useState([])
  const images = [];
  const postType = ['Blog Post'];
  const tagOptions = ['Vegan', 'Vegetarian', 'Healthy', 'Quick'];
  const tagDifficulty = ['Easy', 'Intermediate', 'Hard'];
  const tagMeal = [
    'Breakfast',
    'Lunch',
    'Snack',
    'Dinner',
    'Dessert',
    'Baking',
  ];

  function handleImageChange(e) {
    for (const file of e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc((imgs) => [reader.result, ...imgs]);
      };
      reader.onerror = () => {
        console.log(reader.error);
      };
    }
  }

  async function handleImageSubmit(event) {
    event.preventDefault();

    const fileInput = document.querySelector('[type=file]').files;

    const formData = new FormData();

    // console.log('&&&&&&&&&&&&&&&&&', fileInput);
    // console.log('%%%%%%%%%FORMDATA%%%%%%%%%', formData);
    for (let i = 0; i < fileInput.length; i++) {
      let file = fileInput[i];
      // console.log('%%%%%%%%%FORMDATA IN LOOP%%%%%%%%%', file);
      formData.append('file', file);
      formData.append('upload_preset', 'cyc4e2cm');

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/yozzza/image/upload',
        {
          method: 'POST',
          body: formData,
        }
        // ).then((r) => r.json());
      );

      const data = await response.json();

      console.log('#########DATA', data);

      images.push(data.secure_url);
      setUploadData(data);
    }
    setImageSrc(images);
  }

  const addStep = (state, setter) => {
    setter([...state, '']);
  };

  const removeStep = (index, state, setter) => {
    const currentArray = state.slice();
    currentArray.splice(index, 1);
    setter([...currentArray]);
  };

  const updateInputList = (input, index, state, setter) => {
    const copy = state.slice();
    copy[index] = input;
    setter(copy);
  };

  const toggleTags = (event) => {
    const name = event.target.name;

    const array = recipe?.tags?.slice() || [];

    if (recipe?.tags?.includes(name)) {
      const filtered = array.filter((tag) => tag !== name);
      setRecipe({ ...recipe, tags: filtered });
      console.log(filtered);
    } else {
      array.push(name);
      setRecipe({ ...recipe, tags: array });
    }
  };

  return (
    <section className='bodySection'>
      <h1 id='formTitle'>{!!editMode ? 'EditRecipe' : 'NewRecipe'}</h1>
      <ImageUpload
        uploadData={uploadData}
        imageSrc={imageSrc}
        onImageSubmit={handleImageSubmit}
        onImageChange={handleImageChange}
      />
      <form
        className='postForm'
        onSubmit={(e) =>
          onSubmit(
            e,
            recipe,
            ingredients,
            methodSteps,
            session.user.id,
            imageSrc
          )
        }
      >
        {/* <form className="postForm" onSubmit={handleSubmit}> */}
        <fieldset className='formFeatures'>
          <legend>Post Description</legend>
          <label htmlFor='title'>Title:</label>
          <input
            type='text'
            name='title'
            id='title'
            value={recipe?.title}
            onChange={(e) =>
              setRecipe((currentRecipe) => ({
                ...currentRecipe,
                title: e.target.value,
              }))
            }
          />
          <label htmlFor='description'>Description:</label>
          <textarea
            name='description'
            id='description'
            cols='30'
            rows='10'
            value={recipe?.description}
            onChange={(e) =>
              setRecipe((currentRecipe) => ({
                ...currentRecipe,
                description: e.target.value,
              }))
            }
          ></textarea>
        </fieldset>
        <fieldset className='formFeatures'>
          {' '}
          <legend>Ingredients</legend>
          <ul>
            {ingredients.map((input, index) => {
              return (
                <li key={index}>
                  <div className='inputfields'>
                    <input
                      type='text'
                      onChange={(e) =>
                        updateInputList(
                          e.target.value,
                          index,
                          ingredients,
                          setIngredients
                        )
                      }
                      value={input}
                    />
                    <p
                      className='removeInputField'
                      onClick={() =>
                        removeStep(index, ingredients, setIngredients)
                      }
                    >
                      ❌
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          <button
            className='button'
            type='button'
            onClick={() => addStep(ingredients, setIngredients)}
          >
            add another ingredient
          </button>
        </fieldset>
        <fieldset>
          <legend>Method</legend>
          <ol>
            {methodSteps.map((input, index) => {
              return (
                <li key={index}>
                  <div className='inputfields'>
                    <textarea
                      name='method'
                      onChange={(e) =>
                        updateInputList(
                          e.target.value,
                          index,
                          methodSteps,
                          setMethodSteps
                        )
                      }
                      value={input}
                    />
                    <p
                      className='removeInputField'
                      onClick={() =>
                        removeStep(index, methodSteps, setMethodSteps)
                      }
                    >
                      ❌
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
          <button
            className='button'
            type='button'
            onClick={() => addStep(methodSteps, setMethodSteps)}
          >
            add another method step
          </button>
        </fieldset>
        <fieldset>
          {' '}
          <legend>TAGS</legend>
          <p className='detail'>
            Please Select at most only one in each section
          </p>
          <fieldset>
            <legend>Post Type</legend>
            {postType.map((tag, index) => {
              return (
                <div key={index}>
                  <input
                    // onChange={(e) => setRecipe({ ...recipe, tags: [...recipe?.tags, e.target.value] })}
                    onChange={(e) => toggleTags(e)}
                    name={tag}
                    checked={recipe?.tags?.includes(tag) ? true : false}
                    value={tag}
                    type='checkbox'
                  />
                  <label htmlFor={tag}>{tag}</label>
                </div>
              );
            })}
          </fieldset>
          <fieldset>
            <legend>Meal Type</legend>

            {tagOptions.map((tag, index) => {
              return (
                <div key={index}>
                  <input
                    // onChange={(e) => setRecipe({ ...recipe, tags: [...recipe?.tags, e.target.value] })}
                    onChange={(e) => toggleTags(e)}
                    name={tag}
                    checked={recipe?.tags?.includes(tag) ? true : false}
                    value={tag}
                    type='checkbox'
                  />
                  <label htmlFor={tag}>{tag}</label>
                </div>
              );
            })}
          </fieldset>
          <fieldset>
            <legend>Difficulty</legend>

            {tagDifficulty.map((tag, index) => {
              return (
                <div key={index}>
                  <input
                    // onChange={(e) => setRecipe({ ...recipe, tags: [...recipe?.tags, e.target.value] })}
                    onChange={(e) => toggleTags(e)}
                    name={tag}
                    checked={recipe?.tags?.includes(tag) ? true : false}
                    value={tag}
                    type='checkbox'
                  />
                  <label htmlFor={tag}>{tag}</label>
                </div>
              );
            })}
          </fieldset>
          <fieldset>
            <legend>Meal Type</legend>
            {tagMeal.map((tag, index) => {
              return (
                <div key={index}>
                  <input
                    // onChange={(e) => setRecipe({ ...recipe, tags: [...recipe?.tags, e.target.value] })}
                    onChange={(e) => toggleTags(e)}
                    name={tag}
                    checked={recipe?.tags?.includes(tag) ? true : false}
                    value={tag}
                    type='checkbox'
                  />
                  <label htmlFor={tag}>{tag}</label>
                </div>
              );
            })}
          </fieldset>
        </fieldset>
        <fieldset className='formFeatures'>
          {' '}
          <legend>Recipe Details</legend>
          <label htmlFor='difficulty'>difficulty:</label>
          <input
            type='number'
            name='difficulty'
            id='difficulty'
            min={1}
            max={5}
            placeholder='1(easy)-5(hardest)'
            value={recipe?.difficulty}
            onChange={(e) =>
              setRecipe((currentRecipe) => ({
                ...currentRecipe,
                difficulty: e.target.value,
              }))
            }
          />
          <label htmlFor='prepTime'>Prep Time:</label>
          <input
            type='number'
            name='prepTime'
            id='prepTime'
            placeholder='the amount of time it takes to prep this dish'
            value={recipe?.prepTime}
            onChange={(e) =>
              setRecipe((currentRecipe) => ({
                ...currentRecipe,
                prepTime: e.target.value,
              }))
            }
          />
          <label htmlFor='cookTime'>Cook Time:</label>
          <input
            type='number'
            name='cookTime'
            id='cookTime'
            placeholder='the amount of time it takes to Cook this dish'
            value={recipe?.cookTime}
            onChange={(e) =>
              setRecipe((currentRecipe) => ({
                ...currentRecipe,
                cookTime: e.target.value,
              }))
            }
          />
          <label htmlFor='servingSize'>Serving Size:</label>
          <input
            type='number'
            name='servingSize'
            id='servingSize'
            placeholder='Number of people this dish can serve'
            value={recipe?.servingSize}
            onChange={(e) =>
              setRecipe((currentRecipe) => ({
                ...currentRecipe,
                servingSize: e.target.value,
              }))
            }
          />
          <div>
            <label htmlFor='featured'> Featured</label>
            <input
              type='checkbox'
              name='featured'
              id='featured'
              value
              onChange={(e) =>
                setRecipe({ ...recipe, featured: e.target.checked })
              }
              checked={recipe?.featured ? true : false}
            />
          </div>
        </fieldset>

        <button className='submit button'>
          {editMode ? 'EDIT POST' : 'SUBMIT POST'}
        </button>
      </form>
    </section>
  );
};

export default RecipeForm;
