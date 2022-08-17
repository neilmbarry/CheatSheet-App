import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router';

import store from '../../store/store';
import { setLoading } from '../../store/cocktails';

import IngredientForm from './IngredientForm/IngredientForm';
import RecipeForm from './RecipeForm/RecipeForm';
import Modal from '../UI/Modal';
import PlaceHolderSelection from './PlaceHolderSelection';
import DeleteConfirm from './DeleteConfirm/DeleteConfirm';
import SuccessBox from './SuccessBox/SuccessBox';
import Button from '../UI/Button';
import Title from '../Title/Title';
import Tile from '../UI/Tile/Tile';
import LabelInput from './LabelInput/LabelInput';
import LoadingSpinner from '../UI/Spinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faCocktail } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

import classes from './AddCocktail.module.css';

import { addCocktailVariants } from '../../config/animationVariants';

const generateId = () => Math.floor(Math.random() * 100000 + 1);

const AddCocktail = ({ title, subtitle, action, remove, button }) => {
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const loading = store.getState().config.value.loading;
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
    setIngredients(filteredList.length ? filteredList : [{ id: generateId() }]);
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
    setRecipe(filteredList.length ? filteredList : [{ id: generateId() }]);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    store.dispatch(setLoading(true));
    const cocktail = {
      name: cocktailName.current?.value,
      author: authorName.current?.value,
      glass: glassType.current?.value,
      flavour: flavourType.current?.value,
      garnish: garnishType.current?.value,
      ingredients,
      recipe,
      image,
      slug: cocktailName.current?.value.split(' ').join(''),
    };
    console.log(cocktail);
    setCocktailInfo(cocktail);
    setTimeout(() => {
      action(cocktail);
      store.dispatch(setLoading(false));
      // setLoading(false);
      setShowSuccessModal(true);
    }, 1000);
  };

  const deleteCocktailHandler = (e) => {
    e.preventDefault();
    store.dispatch(setLoading(true));
    remove(slug);
    setLoading(true);
    setTimeout(() => {
      store.dispatch(setLoading(false));
      closeModal();
    }, 1000);
  };

  const logState = () => {
    console.log(JSON.stringify(store.getState().cocktails.value.cocktails));
  };

  const submitPlaceHolderHandler = (pic) => {
    toggleImageModal();
    setImage(pic);
  };

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
      <DeleteConfirm
        info={cocktailInfo}
        confirm={deleteCocktailHandler}
        onClose={closeModal}
      />
    </Modal>
  );

  const successModal = showSuccessModal && (
    <Modal onClose={closeModal}>
      <SuccessBox cocktail={cocktailInfo} onClose={null} />
    </Modal>
  );

  const deleteButton = remove && (
    <div className={classes.closeIcon} onClick={() => setShowDeleteModal(true)}>
      <FontAwesomeIcon icon={faCircleXmark} />
    </div>
  );

  useEffect(() => {
    setFocus(true);
    if (!slug) return;

    const cocktail = store
      .getState()
      .cocktails.value.cocktails.find((cocktail) => cocktail.slug === slug);
    setCocktailInfo(cocktail);
    setIngredients(cocktail.ingredients);
    setRecipe(cocktail.recipe);
    setImage(cocktail.image);
  }, [slug]);

  return (
    <>
      {imageModal}
      {deleteModal}
      {successModal}
      <motion.div
        variants={addCocktailVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={classes.main}
      >
        <Title title={title} subtitle={subtitle} />
        <Tile className={classes.form}>
          {deleteButton}
          <div className={classes.labelRow}>
            <div className={classes.labelColumn}>
              <LabelInput
                label="cocktail"
                name="Cocktail Name"
                placeholder="e.g. Paper Plane"
                parentRef={cocktailName}
                defaultValue={cocktailInfo.name}
              />
              <LabelInput
                label="name"
                name="Author"
                placeholder="e.g. Neil Barry"
                parentRef={authorName}
                defaultValue={cocktailInfo.author}
              />
            </div>
            <div className={classes.labelColumn}>
              <label name="photo">Photo</label>
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
          <div className={classes.labelRow}>
            <LabelInput
              label="glass"
              name="Glass Type"
              placeholder="e.g. Coupe"
              parentRef={glassType}
              defaultValue={cocktailInfo.glass}
            />
            <LabelInput
              label="flavour"
              name="Flavour Profile"
              placeholder="e.g. Citrus Forward"
              parentRef={flavourType}
              defaultValue={cocktailInfo.flavour}
            />
            <LabelInput
              label="garnish"
              name="Garnish"
              placeholder="e.g. Cherry"
              parentRef={garnishType}
              defaultValue={cocktailInfo.garnish}
            />
          </div>
          <IngredientForm
            listItems={ingredients}
            updateIngredient={updateIngredientHandler}
            addIngredient={addIngredientHandler}
            removeIngredient={removeIngredientHandler}
          />
          <RecipeForm
            listItems={recipe}
            updateRecipe={updateRecipeHandler}
            addRecipe={addRecipeHandler}
            removeRecipe={removeStepHandler}
          />
          <div className={classes.btnContainer}>
            <Button onClick={submitFormHandler}>
              {loading ? <LoadingSpinner /> : button}
            </Button>
            <Button type="alt" onClick={() => logState()}>
              Log State
            </Button>
          </div>
        </Tile>
      </motion.div>
    </>
  );
};

export default AddCocktail;
