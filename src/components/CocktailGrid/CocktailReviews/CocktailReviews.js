import React from 'react';
import classes from './CocktailReviews.module.css';

const CocktailReviews = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <h3>Reviews</h3>
    </div>
  );
};

export default CocktailReviews;
