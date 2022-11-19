import React from 'react';
import classes from './AddReviewModal.module.css';
import { useParams } from 'react-router';
import ReviewStarContainer from '../../../components/UI/ReviewStarContainer';
import FormTextArea from '../../../components/UI/FormTextArea';
import Button from '../../../components/UI/Button';

const AddReviewModal = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const params = useParams();
  console.log(params);
  return (
    <div className={classesList}>
      <h2 className={classes.title}>Cocktail Added!</h2>
      <h3>How would you rate this cocktail?</h3>
      {/* <h2>AuthCocktailReview Success</h2> */}
      <ReviewStarContainer
        onClick={(rating) => console.log('Rating received: ', rating)}
        className={classes.stars}
      />
      <h3>Leave a review</h3>
      <FormTextArea placeholder="Let us know your thoughts..." />
      <div className={classes.btnContainer}>
        <Button className={classes.btn} type="main">
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
