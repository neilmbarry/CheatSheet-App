import React from 'react';
import Button from '../../../components/UI/Button';
import store from '../../../store/store';
import classes from './CocktailReviews.module.css';
import Review from './Review';
import configActions from '../../../store/configSlice';

const CocktailReviews = ({ className, cocktail, loading }) => {
  const classesList = `${classes.main} ${className}`;

  const addReviewHandler = () => {
    store.dispatch(configActions.setModal('addReview'));
  };

  const reviewsHandler = () => {
    store.dispatch(configActions.setModal('reviews'));
  };

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
      <Review />
      <Review />
      <Review />
      {/* <Button type={'main'} onClick={addReviewHandler}>
        Add review
      </Button> */}
      <Button type={'alt'} onClick={reviewsHandler}>
        See all
      </Button>
    </div>
  );
};

export default CocktailReviews;
