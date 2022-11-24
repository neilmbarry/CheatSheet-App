import React from 'react';
import classes from './Review.module.css';
import StarContainer from '../../../components/UI/StarContainer';

const Review = ({ className, review }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <h5>{review?.summary}</h5>
      <div className={classes.rating}>
        <StarContainer rating={review?.rating || 0} className={classes.stars} />
        <h5>June 24th</h5>
        <h4>{review?.user.name}</h4>
      </div>
    </div>
  );
};

export default Review;
