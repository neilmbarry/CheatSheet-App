import React, { useRef, useState } from 'react';
import Card from '../UI/Card';
import classes from './AddCocktail.module.css';
import FormInput from '../UI/FormInput';
import FormDropdown from '../UI/FormDropdown';
import IngredientInput from './IngredientInput/IngredientInput';
import Button from '../UI/Button';

const AddCocktail = (props) => {
  const formSubmitHandler = (e) => {
    e.preventDefault();
  };
  const DUMMY_INGS = [
    {
      name: 'Gin',
      brand: 'Bombay Sapphire',
      quantity: 2,
      unit: 'oz',
    },
    {
      name: 'Lime Juice',

      quantity: 22,
      unit: 'ml',
    },
    {
      name: 'Simple Syrup',

      quantity: 15,
      unit: 'ml',
    },
    {},
  ];
  const [ingredients, setIngredients] = useState(DUMMY_INGS);

  const addIngredientHandler = () => {
    const ingsCopy = [...ingredients];
    ingsCopy.push({});
    setIngredients(ingsCopy);
    return;
  };

  const removeIngredientHandler = (id) => {
    console.log('Removing ingredient');
    const ingsCopy = [...ingredients];
    console.log(ingsCopy);
    const removedIng = ingsCopy.filter((ing, i) => +i !== +id);
    console.log(removedIng.length);
    setIngredients(removedIng);
    return;
  };

  const ingredientsJSX = ingredients.map((ing, i) => (
    <IngredientInput
      name={ing.name}
      brand={ing.brand}
      quantity={ing.quantity}
      unit={ing.unit}
      key={i}
      id={i}
      removeIngredient={() => removeIngredientHandler(i)}
    />
  ));

  const ingredientsUI = ingredientsJSX.length ? (
    ingredientsJSX
  ) : (
    <IngredientInput name="Gin" brand="Bombay Sapphire" />
  );

  return (
    <Card classes={classes.addCocktail}>
      <div className={classes.photo}>
        Photo
        <Button>Upload</Button>
      </div>
      <div className={classes.description}>
        <FormInput type="text" placeholder="Cocktail Name" />
        {/* <FormInput type="text" placeholder="name" /> */}
        <FormInput type="text" placeholder="Author" />
        <div className={classes.dropdown}>
          <FormDropdown options={['Rocks', 'Coupe']} changeHandler={null} />
          <FormDropdown options={['Citrusy', 'Boozy']} changeHandler={null} />
        </div>
      </div>
      <div className={classes.ingredients}>
        {ingredientsUI}
        <Button onClick={addIngredientHandler}>Add Ingredient</Button>
      </div>
      <div className={classes.recipe}>
        {/* <p>Recipe</p> */}
        <FormInput type="text" placeholder="Step 1" changeHandler={null} />
        <FormInput type="text" placeholder="Step 2" changeHandler={null} />
        <FormInput type="text" placeholder="Step 3" changeHandler={null} />
        <Button>Add Step</Button>
      </div>
    </Card>
  );
};

export default AddCocktail;
