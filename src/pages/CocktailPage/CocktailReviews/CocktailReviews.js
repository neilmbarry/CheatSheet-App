import React from 'react';
import classes from './CocktailReviews.module.css';

const CocktailReviews = ({ className, cocktail, loading }) => {
  const classesList = `${classes.main} ${className}`;

  if (loading) {
    return (
      <div className={classesList}>
        <h3>Reviews</h3>
        <h4>Loading...</h4>
      </div>
    );
  }
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
