import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router';
import store from '../../store/store';
import {
  addCocktail,
  deleteCocktail,
  updateCocktail,
} from '../../store/cocktails';

import IngredientInput from './IngredientInput/IngredientInput';
import RecipeInput from './RecipeInput/RecipeInput';
import Modal from '../UI/Modal';
import PlaceHolderSelection from './PlaceHolderSelection';
import DeleteConfirm from './DeleteConfirm/DeleteConfirm';
import Button from '../UI/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCocktail } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

import classes from './AddCocktail.module.css';

const generateId = () => Math.floor(Math.random() * 100000 + 1);

const AddCocktail = ({ title, subtitle, action, remove }) => {
  const [ingredients, setIngredients] = useState([
    { unit: 'ml', id: generateId() },
  ]);
  const [recipe, setRecipe] = useState([{ id: generateId() }]);
  const [cocktailInfo, setCocktailInfo] = useState({});
  const slug = useParams().slug;
  const cocktailName = useRef();
  const authorName = useRef();
  const [image, setImage] = useState();
  const glassType = useRef();
  const flavourType = useRef();
  const garnishType = useRef();
  const [showImageModal, setShowImageModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(true);
  const [focus, setFocus] = useState(false);

  const toggleImageModal = () => {
    setShowImageModal((prev) => !prev);
  };

  const closeModal = () => {
    setShowImageModal(false);
    setShowSuccessModal(false);
    setShowDeleteModal(false);
  };

  const addIngredientHandler = () => {
    const updatedIngredients = [
      ...ingredients,
      { unit: 'ml', id: generateId() },
    ];
    setIngredients(updatedIngredients);
    return;
  };

  const updateIngredientHandler = (info) => {
    const modifiedEntry = { ...ingredients[info.index] };
    modifiedEntry[info.type] = info.value;
    const updatedIngredients = ingredients.map((el, i) => {
      if (i === info.index) {
        return modifiedEntry;
      }
      return el;
    });
    setIngredients(updatedIngredients);
  };

  const removeIngredientHandler = (index) => {
    const filteredList = ingredients.filter((ing, i) => {
      return i !== index;
    });
    setIngredients(filteredList.length ? filteredList : [{}]);
    return;
  };

  const addRecipeHandler = () => {
    const updatedRecipe = [...recipe, { id: generateId() }];
    setRecipe(updatedRecipe);
    return;
  };

  const updateRecipeHandler = (info) => {
    const modifiedEntry = { ...recipe[info.index] };
    modifiedEntry.value = info.value;
    const updatedRecipe = recipe.map((el, i) => {
      if (i === info.index) {
        return modifiedEntry;
      }
      return el;
    });
    setRecipe(updatedRecipe);
  };

  const removeStepHandler = (index) => {
    const filteredList = recipe.filter((step, i) => {
      return i !== index;
    });
    setRecipe(filteredList.length ? filteredList : [{}]);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

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
    action(cocktail);
  };

  const deleteCocktailHandler = (e) => {
    e.preventDefault();
    remove(slug);
    closeModal();
  };

  const logState = () => {
    console.log(JSON.stringify(store.getState().cocktails.value.cocktails));
  };

  const submitPlaceHolderHandler = (pic) => {
    toggleImageModal();
    setImage(pic);
  };

  const ingredientsUI = ingredients.map((ing, i) => {
    console.log(ing);
    return (
      <IngredientInput
        ing={ing}
        key={ing.id}
        id={ing.id}
        index={i}
        updateIngredient={(info) => updateIngredientHandler(info)}
        // ref={cocktailName}
        removeIngredient={() => removeIngredientHandler(i)}

        // removeIngredient={() => removeIngredientHandler(ing.id)}
      />
    );
  });

  const recipeUI = recipe.map((step, i) => (
    <RecipeInput
      text={step.value}
      key={step.id}
      id={i}
      index={i}
      updateRecipe={(info) => updateRecipeHandler(info)}
      removeStep={() => removeStepHandler(i)}
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

  const imageModal = showImageModal && (
    <Modal onClose={closeModal}>
      <PlaceHolderSelection
        onClose={closeModal}
        onSubmit={submitPlaceHolderHandler}
      />
    </Modal>
  );

  const deleteModal = showDeleteModal && (
    <Modal onClose={closeModal}>
      <DeleteConfirm info={cocktailInfo} confirm={deleteCocktailHandler} />
    </Modal>
  );

  useEffect(() => {
    setFocus(true);
    if (!slug) return;

    const cocktail = store
      .getState()
      .cocktails.value.cocktails.find((cocktail) => cocktail.slug === slug);
    console.log(cocktail);
    setCocktailInfo(cocktail);
    setIngredients(cocktail.ingredients);
    setRecipe(cocktail.recipe);
    setImage(cocktail.image);
  }, [slug]);

  return (
    <>
      {imageModal}
      {deleteModal}
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        exit={variants.exit}
        className={classes.main}
      >
        <h2>{title}</h2>
        <h6>{subtitle}</h6>

        <div className={classes.formContainer}>
          <div className={classes.labelGroup}>
            <div className={`${classes.labelContainer} ${classes.labelHalf}`}>
              <label name="cocktail">Cocktail Name</label>
              <input
                type="text"
                placeholder="e.g. Paper Plane"
                defaultValue={cocktailInfo.name}
                ref={cocktailName}
                // autoFocus={focus}
              />
              <label name="author">Author</label>
              <input
                type="text"
                placeholder="e.g. Neil Barry"
                ref={authorName}
                defaultValue={cocktailInfo.author}
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
              <input
                type="text"
                placeholder="e.g. Coupe"
                ref={glassType}
                defaultValue={cocktailInfo.glass}
              />
            </div>
            <div className={`${classes.labelContainer} ${classes.labelHalf}`}>
              <label name="flavour">Flavour Profile</label>
              <input
                type="text"
                placeholder="e.g. Citrus Forward"
                ref={flavourType}
                defaultValue={cocktailInfo.flavour}
              />
            </div>

            <div className={classes.labelContainer}>
              <label name="garnish">Garnish</label>
              <input
                type="text"
                placeholder="e.g. Cherry"
                ref={garnishType}
                defaultValue={cocktailInfo.garnish}
              />
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
