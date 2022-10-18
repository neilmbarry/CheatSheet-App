import React from 'react';
import classes from './AddCocktailBox.module.css';

import Tile from '../../../components/UI/Tile/Tile';
import LabelInput from '../LabelInput/LabelInput';
import Button from '../../../components/UI/Button';
import IngredientForm from '../IngredientForm/IngredientForm';
import RecipeForm from '../RecipeForm/RecipeForm';
import LoadingSpinner from '../../../components/UI/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faCocktail } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';

const AddCocktailBox = ({ className, remove }) => {
  const classesList = `${classes.main} ${className}`;

  const cocktailInfo = useSelector((state) => state.create.value);
  const loading = useSelector((state) => state.config.value.loading);

  const submitFormHandler = () => null;

  const deleteButton = remove && (
    <div className={classes.closeIcon} onClick={() => null}>
      <FontAwesomeIcon icon={faCircleXmark} />
    </div>
  );

  return (
    <Tile className={classes.form}>
      {deleteButton}
      <div className={classes.labelRow}>
        <div className={classes.labelColumn}>
          <LabelInput
            label="cocktail"
            name="Cocktail Name"
            placeholder="e.g. Paper Plane"
            //   parentRef={cocktailName}
            defaultValue={cocktailInfo.name}
          />
          <LabelInput
            label="name"
            name="Author"
            placeholder="e.g. Neil Barry"
            //   parentRef={authorName}
            defaultValue={cocktailInfo.author}
          />
        </div>
        <div className={classes.labelColumn}>
          <label name="photo">Photo</label>
          <div className={classes.photoBox}>
            <div className={classes.photoBtns}>
              <Button
                type="alt"
                className={classes.photoButton}
                //   onClick={showPlaceholderModal}
              >
                Select
              </Button>
            </div>
            <div className={classes.photoContainer}>
              <div className={classes.photoImage}>
                {cocktailInfo.image ? (
                  <img src={cocktailInfo.image} alt="none" />
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
          // parentRef={glassType}
          defaultValue={cocktailInfo.glass}
        />
        <LabelInput
          label="flavour"
          name="Flavour Profile"
          placeholder="e.g. Citrus Forward"
          // parentRef={flavourType}
          defaultValue={cocktailInfo.flavour}
        />
        <LabelInput
          label="garnish"
          name="Garnish"
          placeholder="e.g. Cherry"
          // parentRef={garnishType}
          defaultValue={cocktailInfo.garnish}
        />
      </div>
      <IngredientForm
        listItems={cocktailInfo.ingredients}
        //   updateIngredient={updateIngredientHandler}
        //   addIngredient={addIngredientHandler}
        //   removeIngredient={removeIngredientHandler}
      />
      <RecipeForm
        listItems={cocktailInfo.method}
        //   updateRecipe={updateRecipeHandler}
        //   addRecipe={addRecipeHandler}
        //   removeRecipe={removeRecipeHandler}
      />
      <div className={classes.btnContainer}>
        <Button onClick={submitFormHandler}>
          {loading ? <LoadingSpinner /> : 'submit'}
        </Button>
        <Button type="alt" onClick={() => null}>
          Log State
        </Button>
      </div>
    </Tile>
  );
};

export default AddCocktailBox;
