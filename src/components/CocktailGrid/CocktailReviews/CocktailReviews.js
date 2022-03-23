import React from 'react';
import classes from './CocktailReviews.module.css';

const CocktailReviews = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <h3>Reviews</h3>
      <p>This cocktail is shit.</p>
      <p>I love this drink!</p>
      <p>Tasty!</p>
      <p>Not bad, not great...</p>
    </div>
  );
};

export default CocktailReviews;
