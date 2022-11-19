import React from 'react';
import classes from './CocktailIngredients.module.css';

const CocktailIngredients = ({ className, cocktail, loading }) => {
  const classesList = `${classes.main} ${className}`;

  if (loading) {
    return (
      <div className={classesList}>
        <h3>Ingredients</h3>
        <h4>Loading...</h4>
      </div>
    );
  }

  const ingredientsJSX = cocktail?.ingredients.map((ing, i) => {
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
      <h4>Garnish: {cocktail.garnish}</h4>
    </div>
  );
};

export default CocktailIngredients;
