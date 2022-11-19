import React from 'react';
import classes from './Review.module.css';
import StarContainer from '../../../components/UI/StarContainer';

const Review = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <h5>"I think this is a great cocktail!"</h5>
      <div className={classes.rating}>
        <StarContainer rating={3.8} className={classes.stars} />
        <h5>June 24th</h5>
        <h4>Neil Barry</h4>
      </div>
    </div>
  );
};

export default Review;
