import React from 'react';
import classes from './StarContainer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart as faHeartFull,
  faStarHalfStroke,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

const StarContainer = ({ rating }) => {
  const roundedRating = Math.round(rating * 2) / 2;
  const display = Array(roundedRating)
    .fill(0)
    .map((el) => <FontAwesomeIcon icon={faStar} />);
  return <div className={classes.main}>{display}</div>;
};

export default StarContainer;
