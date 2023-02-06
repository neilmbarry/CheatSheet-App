import React, { useEffect, useRef } from 'react';
import classes from './AddReviewModal.module.css';
import { useNavigate, useParams } from 'react-router';
import ReviewStarContainer from '../../../components/UI/ReviewStarContainer';
import FormTextArea from '../../../components/UI/FormTextArea';
import Button from '../../../components/UI/Button';
import { useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import store from '../../../store/store';
import configActions from '../../../store/configSlice';
import { reviewResponseHandler } from '../../../hooks/responseHandler';

const AddReviewModal = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const [rating, setRating] = useState(0);
  const review = useRef();
  const token = useSelector((state) => state.config.value.token);
  const navigate = useNavigate();

  const cocktailId = useSelector(
    (state) => state.config.value.currentCocktailId
  );
  const slug = useSelector((state) => state.config.value.currentCocktailSlug);

  let { response, fetchRequest } = useFetch('reviews');

  const close = () => {
    store.dispatch(configActions.setModal(null));
  };

  const addReviewHandler = () => {
    if (!rating) {
      return store.dispatch(
        configActions.setNotification({
          type: 'fail',
          message: 'A review must have a rating!',
        })
      );
    }
    const body = {
      rating,
      summary: review?.current?.value,
      cocktailId,
    };
    fetchRequest({
      body,
      method: 'POST',
      token,
    });
  };

  useEffect(() => {
    reviewResponseHandler(response);
    if (response.data.status === 'success') {
      navigate('/cocktails/' + slug);
      store.dispatch(configActions.setModal(null));
    }
    response.data.status = null;
  }, [response]);

  return (
    <div className={classesList}>
      <h3 className={classes.text}>How would you rate this cocktail?</h3>
      {/* <h2>AuthCocktailReview Success</h2> */}
      <ReviewStarContainer
        onClick={(rating) => setRating(rating)}
        className={classes.stars}
      />
      <h3 className={classes.text}>Leave a review</h3>
      <FormTextArea
        parentRef={review}
        placeholder="Let us know your thoughts..."
      />
      <div className={classes.btnContainer}>
        <Button className={classes.btn} type="main" onClick={addReviewHandler}>
          Submit
        </Button>
        <Button className={classes.btn} type="alt" onClick={close}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AddReviewModal;
