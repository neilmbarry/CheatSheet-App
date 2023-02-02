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
  const [sortBy, setSortBy] = useState('Recent');
  const navigate = useNavigate();

  const slug = useSelector((state) => state.config.value.currentCocktailSlug);

  const addReviewHandler = () => {
    store.dispatch(configActions.setModal('addReview'));
  };

  const { data, loading, error, fetchRequest } = useFetch(`cocktails/${slug}`);

  console.log(`cocktails/${slug}`);

  const reviewsJSX =
    data?.cocktail?.reviews.length &&
    data.cocktail.reviews.map((review, i) => {
      return <Review review={review} key={i} />;
    });

  useState(() => {
    fetchRequest({});
  }, []);

  return (
    <div className={classesList}>
      <div className={classes.title}>
        <h2>Reviews ({data?.cocktail?.reviews.length || 0})</h2>
        <Dropdown
          options={{ Recent: null, Rating: null }}
          selected={sortBy}
          updateValue={(value) => setSortBy(value)}
        />
      </div>
      <div className={classes.reviews}>
        {reviewsJSX}
        {loading && <LoadingSpinner />}
      </div>
      <Button type="main" onClick={addReviewHandler}>
        Add review
      </Button>
    </div>
  );
};

export default ReviewsModal;
