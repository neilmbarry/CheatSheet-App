import React from 'react';
import classes from './ReviewsModal.module.css';
import Review from './Review';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import { useState } from 'react';
import Button from '../../../components/UI/Button';
import store from '../../../store/store';
import configActions from '../../../store/configSlice';
import { useHistory, useParams } from 'react-router';
import useFetch from '../../../hooks/useFetch';

const ReviewsModal = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const [sortBy, setSortBy] = useState('Recent');
  const history = useHistory();
  const addReviewHandler = () => {
    store.dispatch(configActions.setModal('addReview'));
  };
  const slug = history.location.pathname.split('/')[2];

  const { data } = useFetch({
    url: `cocktails?slug=${slug}`,
    reload: slug,
  });

  console.log(data);

  const reviewsJSX = data?.cocktails[0].reviews.length ? (
    data?.cocktails[0].reviews.map((review, i) => {
      return <Review review={review} key={i} />;
    })
  ) : (
    <h4>There are no reviews!</h4>
  );

  return (
    <div className={classesList}>
      <div className={classes.title}>
        <h2>Reviews ({data?.cocktails[0].reviews.length || 0})</h2>
        <Dropdown
          options={{ Recent: 'Recent', Rating: 'Rating' }}
          selected={sortBy}
          updateValue={(value) => setSortBy(value)}
        />
      </div>
      <div className={classes.reviews}>{reviewsJSX}</div>
      <Button type="main" onClick={addReviewHandler}>
        Add review
      </Button>
    </div>
  );
};

export default ReviewsModal;
