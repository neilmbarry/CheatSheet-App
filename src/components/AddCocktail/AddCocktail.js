import React, { useState } from 'react';
import Card from '../UI/Card';
import classes from './AddCocktail.module.css';
import FormInput from '../UI/FormInput';
import FormDropdown from '../UI/FormDropdown';
import IngredientInput from './IngredientInput/IngredientInput';
import RecipeInput from './RecipeInput/RecipeInput';
import Button from '../UI/Button';

const generateId = () => Math.floor(Math.random() * 100000 + 1);
const DUMMY_INGS = [
  {
    name: 'Gin',
    brand: 'Bombay Sapphire',
    quantity: 2,
    unit: 'oz',
    id: generateId(),
  },
  {
    name: 'Lime Juice',
    quantity: 22,
    unit: 'ml',
    id: generateId(),
  },
  {
    name: 'Simple Syrup',
    quantity: 15,
    unit: 'ml',
    id: generateId(),
  },
];

const AddCocktail = (props) => {
  const [ingredients, setIngredients] = useState(DUMMY_INGS);
  const [recipe, setRecipe] = useState([{ id: generateId() }]);

  const addIngredientHandler = () => {
    const updatedIngredients = [...ingredients, { id: generateId() }];
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

  const ingredientsUI = ingredients.map((ing, i) => (
    <IngredientInput
      ing={ing}
      key={ing.id}
      id={ing.id}
      removeIngredient={() => removeIngredientHandler(ing.id)}
    />
  ));

  const recipeUI = recipe.map((step, i) => (
    <RecipeInput
      text={step.text}
      key={step.id}
      id={step.id}
      index={i}
      removeStep={() => removeStepHandler(step.id)}
    />
  ));

  return (
    <Card classes={classes.addCocktail}>
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
    </Card>
  );
};

export default AddCocktail;
