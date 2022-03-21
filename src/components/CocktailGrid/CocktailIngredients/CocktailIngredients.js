import React from 'react';
import classes from './CocktailIngredients.module.css';

const CocktailIngredients = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <h3>Ingredients</h3>
    </div>
  );
};

export default CocktailIngredients;
