import React from 'react';
import classes from './ReviewsModal.module.css';
import Review from './Review';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import { useState } from 'react';
import Button from '../../../components/UI/Button';
import store from '../../../store/store';
import configActions from '../../../store/configSlice';
import { useNavigate, useParams } from 'react-router';
import useFetch from '../../../hooks/useFetch';
import LoadingSpinner from '../../../components/UI/Spinner';
import { useSelector } from 'react-redux';

const ReviewsModal = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const token = useSelector((state) => state.config.value.token);

  const slug = useSelector((state) => state.config.value.currentCocktailSlug);

  const addReviewHandler = () => {
    if (!token) {
      return store.dispatch(
        configActions.setNotification({
          type: 'fail',
          message: 'You must be signed in to leave a review!',
        })
      );
    }
    store.dispatch(configActions.setModal('addReview'));
  };

  const { response, fetchRequest } = useFetch(`cocktails/${slug}`);

  const reviewsJSX = response.data?.cocktail?.reviews.length ? (
    response.data.cocktail.reviews.map((review, i) => {
      return <Review review={review} key={i} />;
    })
  ) : (
    <h4>No reviews</h4>
  );

  useState(() => {
    fetchRequest({});
  }, []);

  return (
    <div className={classesList}>
      <div className={classes.title}>
        <h2>Reviews ({response.data?.cocktail?.reviews.length || 0})</h2>
        {/* <Dropdown
          options={{ Recent: null, Rating: null }}
          selected={sortBy}
          updateValue={(value) => setSortBy(value)}
        /> */}
      </div>
      <div className={classes.reviews}>
        {reviewsJSX}
        {response.loading && <LoadingSpinner />}
      </div>
      <Button type="main" onClick={addReviewHandler}>
        Add review
      </Button>
    </div>
  );
};

export default ReviewsModal;
