import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router';

import store from '../../store/store';
import configActions from '../../store/configSlice';

import IngredientForm from './IngredientForm/IngredientForm';

import AddCocktailBox from './AddCocktailBox/AddCocktailBox';
import Modal from '../../components/UI/Modal';
// import PlaceHolderSelection from './PlaceHolder/PlaceHolderSelection';
import DeleteConfirm from './DeleteConfirm/DeleteConfirm';
import SuccessBox from './SuccessBox/SuccessBox';

import Title from '../../components/UI/Title/Title';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

import classes from './AddCocktailPage.module.css';

import { addCocktailVariants } from '../../config/animationVariants';
import { apiEndpoint } from '../../config/apiEndpoint';
import { useSelector } from 'react-redux';

const generateId = () => Math.floor(Math.random() * 100000 + 1);

const AddCocktail = ({ title, subtitle, action, remove, button }) => {
  const cocktailName = useRef();
  const authorName = useRef();
  const glassType = useRef();
  const flavourType = useRef();
  const garnishType = useRef();
  const [ingredients, setIngredients] = useState([
    { unit: 'ml', id: generateId() },
  ]);
  const [recipe, setRecipe] = useState([{ id: generateId() }]);

  const [cocktailInfo, setCocktailInfo] = useState({});
  const slug = useParams().slug;
  const [image, setImage] = useState();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const loading = useSelector((state) => state.config.value.loading);
  const token = useSelector((state) => state.config.value.token);

  const [focus, setFocus] = useState(false);

  const addIngredientHandler = () => {
    setIngredients((prev) => [...prev, { unit: 'ml', id: generateId() }]);
    return;
  };

  const updateIngredientHandler = (info) => {
    const modifiedEntry = { ...ingredients[info.index] };
    modifiedEntry[info.name] = info.value;
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
    setRecipe((prev) => [...prev, { id: generateId() }]);
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

  const removeRecipeHandler = (index) => {
    const filteredList = recipe.filter((step, i) => {
      return i !== index;
    });
    setRecipe(filteredList.length ? filteredList : [{ id: generateId() }]);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    store.dispatch(configActions.setLoading(true));
    // TODO Check if slug exists

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

    const body = JSON.stringify(cocktail);

    console.log(cocktail);
    setCocktailInfo(cocktail);
    setTimeout(() => {
      // action(cocktail);
      store.dispatch(configActions.setLoading(false));
      fetch(`${apiEndpoint()}api/v1/cocktails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body,
      })
        .then((res) => {
          console.log(res.ok);
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setShowSuccessModal(true);
        })
        .catch((err) => console.warn(err));
      // configActions.setLoading(false);
    }, 1000);
  };

  const deleteCocktailHandler = (e) => {
    e.preventDefault();
    store.dispatch(configActions.setLoading(true));
    remove(slug);
    configActions.setLoading(true);
    setTimeout(() => {
      store.dispatch(configActions.setLoading(false));
    }, 1000);
  };

  const logState = () => {
    store.dispatch(
      configActions.setModal(
        <DeleteConfirm info={cocktailInfo} confirm={deleteCocktailHandler} />
      )
    );
    // setCocktailInfo({});
    // console.log(store.getState().cocktails.value.cocktails);
  };

  const submitPlaceHolderHandler = (pic) => {
    setImage(pic);
  };

  const showPlaceholderModal = () => {
    store.dispatch(
      configActions.setModal({
        type: 'placeholderSelection',
        onSubmit: submitPlaceHolderHandler(),
      })
    );
  };

  const deleteModal = showDeleteModal && (
    <DeleteConfirm info={cocktailInfo} confirm={deleteCocktailHandler} />
  );

  const successModal = showSuccessModal && (
    <SuccessBox cocktail={cocktailInfo} />
  );

  const deleteButton = remove && (
    <div className={classes.closeIcon} onClick={() => setShowDeleteModal(true)}>
      <FontAwesomeIcon icon={faCircleXmark} />
    </div>
  );

  useEffect(() => {
    setFocus(true);
    if (!slug) return;
    console.log(slug);

    fetch(`${apiEndpoint()}api/v1/cocktails?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        const cocktail = data.cocktails[0];
        console.log(cocktail);
        setCocktailInfo(cocktail);
        setIngredients(cocktail.ingredients);
        setRecipe(cocktail.recipe);
        setImage(cocktail.image);
      })
      .catch((err) => console.error(err));
  }, [slug]);

  return (
    <>
      <motion.div
        variants={addCocktailVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={classes.main}
      >
        <Title title={title} subtitle={subtitle} />
        <AddCocktailBox />
      </motion.div>
    </>
  );
};

export default AddCocktail;
