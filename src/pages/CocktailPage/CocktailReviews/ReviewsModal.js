import React from 'react';
import classes from './ReviewsModal.module.css';
import Review from './Review';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import { useState } from 'react';

const ReviewsModal = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const [sortBy, setSortBy] = useState('Recent');
  return (
    <div className={classesList}>
      <div className={classes.title}>
        <h2>Reviews (131)</h2>
        <Dropdown
          options={{ Recent: 'Recent', Rating: 'Rating' }}
          selected={sortBy}
          updateValue={(value) => setSortBy(value)}
        />
      </div>
      <div className={classes.reviews}>
        <Review className={classes.review} />
        <Review className={classes.review} />
        <Review className={classes.review} />
        <Review className={classes.review} />
      </div>
    </div>
  );
};

export default ReviewsModal;
