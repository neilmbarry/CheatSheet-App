import React from 'react';
import classes from './CocktailIngredients.module.css';

const CocktailIngredients = ({ className, cocktail }) => {
  const classesList = `${classes.main} ${className}`;

  const ingredientsJSX = cocktail.ingredients.map((ing, i) => {
    // console.log(ing);
    return (
      <div key={i}>
        <p>
          {ing.quantity}
          {ing.unit.toLowerCase()} {ing.name}{' '}
          <span style={{ color: 'grey', fontWeight: '300' }}>{ing.brand}</span>
        </p>
      </div>
    );
  });

  return (
    <div className={classesList}>
      <h3>Ingredients</h3>
      {ingredientsJSX}
    </div>
  );
};

export default CocktailIngredients;
