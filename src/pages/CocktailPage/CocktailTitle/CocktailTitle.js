import React from 'react';
import classes from './CocktailTitle.module.css';
// import Star from '../../UI/Star';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfStroke, faStar } from '@fortawesome/free-solid-svg-icons';

const CocktailTitle = ({ className, cocktail, loading }) => {
  const classesList = `${classes.main} ${className}`;
  const title = cocktail?.name;
  const author = `${cocktail?.author}, Sydney, Australia`;
  const date = 'January 19, 2022';
  const rating = '4.9';
  const reviews = '102';

  if (loading) {
    return (
      <div className={`${classes.loading} ${className}`}>
        <h1>Loading...</h1>
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className={classesList}>
      <h1>{title}</h1>
      <h4>by {author}</h4>
      <h5>{date}</h5>
      <div className={classes.ratings}>
        <h3>{rating}</h3>
        <div className={classes.stars}>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStarHalfStroke} />
        </div>

        <h3>
          <span className={classes.smaller}>({reviews})</span>
        </h3>
      </div>
      <h3>{cocktail.glass}</h3>
      <h3>{cocktail.flavour}</h3>
    </div>
  );
};

export default CocktailTitle;
