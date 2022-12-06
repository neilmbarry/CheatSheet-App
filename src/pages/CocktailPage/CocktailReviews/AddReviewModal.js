import React, { useRef } from 'react';
import classes from './AddReviewModal.module.css';
import { useHistory, useParams } from 'react-router';
import ReviewStarContainer from '../../../components/UI/ReviewStarContainer';
import FormTextArea from '../../../components/UI/FormTextArea';
import Button from '../../../components/UI/Button';
import { useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import { apiEndpoint } from '../../../config/apiEndpoint';
import store from '../../../store/store';
import configActions from '../../../store/configSlice';

const AddReviewModal = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const [rating, setRating] = useState(0);
  const [sendRequest, setSendRequest] = useState(false);
  const review = useRef();
  const token = useSelector((state) => state.config.value.token);
  const history = useHistory();

  const cocktailId = history.location.pathname.split('/')[2];

  // const { data, error, loading } = useFetch({
  //   url: 'reviews',
  //   method: 'POST',
  //   body: {
  //     rating,
  //     review: review?.current?.value,
  //     cocktailId,
  //   },
  //   reload: sendRequest,
  // });

  // if (data && sendRequest) {
  //   setSendRequest(false);
  // }

  const addReviewHandler = () => {
    const body = JSON.stringify({
      rating,
      summary: review?.current?.value,
      cocktailId,
    });
    // setSendRequest(true);
    fetch(apiEndpoint() + 'reviews', {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.ok, 'IS IT OKAY?');
        return res.json();
      })
      .then((data) => {
        console.log(data);
        history.push(history.location.pathname);
        store.dispatch(configActions.setModal(null));
        // setShowSuccessModal(true);
      })
      .catch((err) => console.warn(err));
  };

  return (
    <div className={classesList}>
      <h3>How would you rate this cocktail?</h3>
      {/* <h2>AuthCocktailReview Success</h2> */}
      <ReviewStarContainer
        onClick={(rating) => setRating(rating)}
        className={classes.stars}
      />
      <h3>Leave a review</h3>
      <FormTextArea
        parentRef={review}
        placeholder="Let us know your thoughts..."
      />
      <div className={classes.btnContainer}>
        <Button className={classes.btn} type="main" onClick={addReviewHandler}>
          Submit
        </Button>
        <Button className={classes.btn} type="alt">
          Skip
        </Button>
      </div>
    </div>
  );
};

export default AddReviewModal;
