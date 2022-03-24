import React from 'react';
import classes from './Result.module.css';
// import img from '../../img/paper.jpg';
import Star from '../UI/Star';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const Result = ({ onClick, img, name, tags, rating, reviews, isAuthor }) => {
  const tagsHTML = tags.join(' | ');
  return (
    <Link to="/">
      <div className={classes.main} onClick={onClick}>
        <div className={classes.image}>
          <img src={img} alt="" />
        </div>
        <div className={classes.textBox}>
          <h3>{name}</h3>
          <h6>{tagsHTML}</h6>
          <div className={classes.rating}>
            <h3>{rating.toFixed(1)}</h3>
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
            <h4>({reviews})</h4>
          </div>
        </div>
        <div className={classes.icon + ' ' + classes.fav}>
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <div className={classes.icon + ' ' + classes.edit}>
          {isAuthor && <FontAwesomeIcon icon={faPenToSquare} />}
        </div>
      </div>
    </Link>
  );
};

export default Result;
