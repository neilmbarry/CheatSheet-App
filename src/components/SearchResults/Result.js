import React, { useState } from 'react';
import classes from './Result.module.css';
// import img from '../../img/paper.jpg';
// import Star from '../UI/Star';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as faHeartFull,
  faStarHalfStroke,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

import { faCocktail } from '@fortawesome/free-solid-svg-icons';

import store from '../../store/store';
import { toggleFave } from '../../store/cocktails';

const Result = ({
  onClick,
  info,
  name,
  tags,
  rating,
  reviews,
  isAuthor,
  fave,
  slug,
  image,
}) => {
  const tagsHTML = tags.join(' | ');

  const [favourite, setFavourite] = useState(fave);

  const toggleFaveUI = (e) => {
    console.log('toggling fave', ' event===', e);
    e.preventDefault();
    e.stopPropagation();
    setFavourite((prev) => !prev);
    return store.dispatch(toggleFave(slug));
  };

  return (
    <Link to={`/cocktails/${slug}`}>
      <div className={classes.main} onClick={onClick}>
        <div className={classes.image}>
          {image ? (
            <img src={image} alt="" />
          ) : (
            <FontAwesomeIcon icon={faCocktail}></FontAwesomeIcon>
          )}
        </div>
        <div className={classes.textBox}>
          <h3>{name}</h3>
          <h6>{tagsHTML}</h6>
          <div className={classes.rating}>
            <h3>{rating.toFixed(1)}</h3>
            <div className={classes.stars}>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStarHalfStroke} />
            </div>
            <h4>({reviews})</h4>
          </div>
        </div>
        <div
          className={classes.icon + ' ' + classes.fav}
          onClick={toggleFaveUI}
        >
          {favourite ? (
            <FontAwesomeIcon icon={faHeartFull} />
          ) : (
            <FontAwesomeIcon icon={faHeart} />
          )}
        </div>
        <div className={classes.icon + ' ' + classes.edit}>
          {isAuthor && <FontAwesomeIcon icon={faPenToSquare} />}
        </div>
      </div>
    </Link>
  );
};

export default Result;
