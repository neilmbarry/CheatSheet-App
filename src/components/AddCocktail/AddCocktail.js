import React, { useState, useRef } from 'react';
// import Card from '../UI/Card';
import classes from './AddCocktail.module.css';
// import FormInput from '../UI/FormInput';
// import FormDropdown from '../UI/FormDropdown';
import IngredientInput from './IngredientInput/IngredientInput';
import RecipeInput from './RecipeInput/RecipeInput';
import Button from '../UI/Button';
// import StarContainer from '../UI/StarContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCocktail } from '@fortawesome/free-solid-svg-icons';
import store from '../../store/store';
import { addCocktail, deleteCocktail } from '../../store/cocktails';
import Modal from '../UI/Modal';
import PlaceHolderSelection from './PlaceHolderSelection';
import { motion } from 'framer-motion';

const generateId = () => Math.floor(Math.random() * 100000 + 1);
// const DUMMY_INGS = [
//   {
//     name: 'Gin',
//     brand: 'Bombay Sapphire',
//     quantity: 2,
//     unit: 'oz',
//     id: generateId(),
//   },
//   {
//     name: 'Lime Juice',
//     quantity: 22,
//     unit: 'ml',
//     id: generateId(),
//   },
//   {
//     name: 'Simple Syrup',
//     quantity: 15,
//     unit: 'ml',
//     id: generateId(),
//   },
// ];

const AddCocktail = (props) => {
  const [ingredients, setIngredients] = useState([
    { id: generateId(), unit: 'ml' },
  ]);
  const [recipe, setRecipe] = useState([{ id: generateId() }]);
  const cocktailName = useRef();
  const authorName = useRef();
  const [image, setImage] = useState();
  const glassType = useRef();
  const flavourType = useRef();
  const garnishType = useRef();
  const [showImageModal, setShowImageModal] = useState(false);

  const toggleImageModal = () => {
    setShowImageModal((prev) => !prev);
  };

  const addIngredientHandler = () => {
    const updatedIngredients = [
      ...ingredients,
      { id: generateId(), unit: 'ml' },
    ];
    setIngredients(updatedIngredients);
    return;
  };

  const removeIngredientHandler = (id) => {
    const removedIng = ingredients.filter((ing) => {
      return +ing.id !== id;
    });
    setIngredients(removedIng.length ? removedIng : [{ id: generateId() }]);
    return;
  };

  const updateIngredientHandler = (info) => {
    const modifiedEntry = { ...ingredients.find((el) => el.id === info.id) };
    modifiedEntry[info.type] = info.value;
    const updatedIngredients = ingredients.map((el) => {
      if (el.id === info.id) {
        return modifiedEntry;
      }
      return el;
    });
    setIngredients(updatedIngredients);
  };
  const updateRecipeHandler = (info) => {
    const modifiedEntry = { ...recipe.find((el) => el.id === info.id) };
    modifiedEntry.value = info.value;
    const updatedRecipe = recipe.map((el) => {
      if (el.id === info.id) {
        return modifiedEntry;
      }
      return el;
    });
    setRecipe(updatedRecipe);
  };

  const addRecipeHandler = () => {
    const updatedRecipe = [...recipe, { id: generateId() }];
    setRecipe(updatedRecipe);
    return;
  };

  const removeStepHandler = (id) => {
    console.log('removing step');
    const removedStep = recipe.filter((step) => {
      return step.id !== id;
    });
    setRecipe(removedStep.length ? removedStep : [{ id: generateId() }]);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    // console.log(ingredients);
    // console.log(recipe);
    const cocktail = {
      name: cocktailName.current.value,
      author: authorName.current.value,
      glass: glassType.current.value,
      flavour: flavourType.current.value,
      garnish: garnishType.current.value,
      ingredients,
      recipe,
      image,
      slug: cocktailName.current.value.split(' ').join(''),
    };
    console.log(cocktail);
    store.dispatch(addCocktail(cocktail));
  };

  const logState = () => {
    console.log(JSON.stringify(store.getState().cocktails.value.cocktails));
  };

  const submitPlaceHolderHandler = (pic) => {
    toggleImageModal();
    setImage(pic);
  };

  const ingredientsUI = ingredients.map((ing, i) => (
    <IngredientInput
      ing={ing}
      key={ing.id}
      id={ing.id}
      updateIngredient={(info) => updateIngredientHandler(info)}
      // ref={cocktailName}
      removeIngredient={() => removeIngredientHandler(ing.id)}
    />
  ));

  const recipeUI = recipe.map((step, i) => (
    <RecipeInput
      text={step.text}
      key={step.id}
      id={step.id}
      index={i}
      updateRecipe={(info) => updateRecipeHandler(info)}
      removeStep={() => removeStepHandler(step.id)}
    />
  ));

  const defaultVariants = {
    hidden: {
      x: 100,
      opacity: 0,
      // scale: 0.8,

      // rotate: "0deg",
    },
    visible: {
      x: 0,
      opacity: 1,

      transition: {
        type: 'spring',
        // delay: 0.5,
        duration: 0.5,
      },
    },
    exit: {
      x: -100,
      opacity: 0,
      // scale: 0.9,
      transition: {
        type: 'spring',
        // delay: 0.5,
        duration: 0.3,
      },
    },
  };

  const variants = defaultVariants;

  return (
    <>
      {showImageModal && (
        <Modal onClose={toggleImageModal}>
          <PlaceHolderSelection
            onClose={toggleImageModal}
            onSubmit={submitPlaceHolderHandler}
          />
        </Modal>
      )}
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        exit={variants.exit}
        className={classes.main}
      >
        <h2>Create a cocktail</h2>
        <h6>Fill in required fields to add a cocktail.</h6>

        <div className={classes.formContainer}>
          <div className={classes.labelGroup}>
            <div className={`${classes.labelContainer} ${classes.labelHalf}`}>
              <label name="cocktail">Cocktail Name</label>
              <input
                type="text"
                placeholder="e.g. Paper Plane"
                ref={cocktailName}
              />
              <label name="author">Author</label>
              <input
                type="text"
                placeholder="e.g. Neil Barry"
                ref={authorName}
              />
            </div>
            <div className={classes.labelContainer}>
              <label name="author">Photo</label>
              <div className={classes.photoBox}>
                <div className={classes.photoBtns}>
                  <Button type="alt" className={classes.photoButton}>
                    Upload Photo
                  </Button>
                  <div className={classes.orBreak}>
                    <span>or</span>
                  </div>
                  <Button
                    type="alt"
                    className={classes.photoButton}
                    onClick={toggleImageModal}
                  >
                    Choose Placeholder
                  </Button>
                </div>
                <div className={classes.photoContainer}>
                  <div className={classes.photoImage}>
                    {image ? (
                      <img src={image} alt="none" />
                    ) : (
                      <FontAwesomeIcon icon={faCocktail}></FontAwesomeIcon>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.labelGroup}>
            <div className={`${classes.labelContainer} ${classes.labelHalf}`}>
              <label name="glass">Glass Type</label>
              <input type="text" placeholder="e.g. Coupe" ref={glassType} />
            </div>
            <div className={`${classes.labelContainer} ${classes.labelHalf}`}>
              <label name="flavour">Flavour Profile</label>
              <input
                type="text"
                placeholder="e.g. Citrus Forward"
                ref={flavourType}
              />
            </div>

            <div className={classes.labelContainer}>
              <label name="garnish">Garnish</label>
              <input type="text" placeholder="e.g. Cherry" ref={garnishType} />
            </div>
          </div>
          <div className={classes.labelContainer}>
            <label name="ingredients">Ingredients</label>
            {/* <input
              type="password"
              placeholder="e.g. Neil Barry"
              className={classes.password}
            /> */}
            {ingredientsUI}
            <h6 className={classes.addBtn} onClick={addIngredientHandler}>
              + Add another ingredient
            </h6>
          </div>
          <div className={classes.labelContainer}>
            <label name="password">Method</label>
            {/* <input
              type="password"
              placeholder="e.g. Neil Barry"
              className={classes.password}
            /> */}
            {recipeUI}
            <h6 className={classes.addBtn} onClick={addRecipeHandler}>
              + Add another step
            </h6>
          </div>

          <div className={classes.btnContainer}>
            <Button onClick={submitFormHandler}>Submit</Button>
            <Button type="alt" onClick={() => logState()}>
              Log State
            </Button>
          </div>
        </div>
      </motion.div>
      {/* <Card classes={classes.addCocktail}>
        <div className={classes.photo}>
          Photo
          <Button>Upload</Button>
        </div>
        <div className={classes.description}>
          <FormInput type="text" placeholder="Cocktail Name" />
          <FormInput type="text" placeholder="Author" />
          <div className={classes.dropdown}>
            <p>Glass:</p>
            <FormDropdown options={['Rocks', 'Coupe']} changeHandler={null} />
            <p>Taste:</p>
            <FormDropdown options={['Citrusy', 'Boozy']} changeHandler={null} />
          </div>
        </div>
        <div className={classes.ingredients}>
          {ingredientsUI}
          <Button onClick={addIngredientHandler}>Add Ingredient</Button>
        </div>
        <div className={classes.recipe}>
          {recipeUI}

          <Button onClick={addRecipeHandler}>Add Step</Button>
        </div>

        <div></div>
        <div className={classes.submit}>
          <Button>Add Cocktail</Button>
        </div>
      </Card> */}
    </>
  );
};

export default AddCocktail;
