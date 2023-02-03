import React from 'react';
import classes from './Review.module.css';
import StarContainer from '../../../components/UI/StarContainer';
import { dateFormat } from '../../../util/dateFormat';

const Review = ({ className, review }) => {
  const classesList = `${classes.main} ${className}`;
  // console.warn(review);
  return (
    <div className={classesList}>
      {review?.summary && <h5>"{review?.summary}"</h5>}
      <div className={classes.rating}>
        <StarContainer rating={review?.rating || 0} className={classes.stars} />
        <h5>{dateFormat(review?.createdAt)}</h5>
        <h4>{review?.user?.name}</h4>
      </div>
    </div>
  );
};

export default Review;
