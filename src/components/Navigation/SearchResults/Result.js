// Main imports
import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import classes from './Result.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCocktail } from '@fortawesome/free-solid-svg-icons';

// Components
import StarContainer from '../../UI/StarContainer';
import FaveIcon from '../../UI/FaveIcon/FaveIcon';
import AuthorIcon from '../../UI/AuthorIcon/AuthorIcon';

const Result = ({ onClick, cocktail }) => {
  const tagsHTML = [
    cocktail.ingredients[0].name,
    cocktail.flavour,
    cocktail.glass,
  ].join(' | ');

  const cocktailImage = cocktail.image ? (
    <img src={cocktail.image} alt="cocktail" />
  ) : (
    <FontAwesomeIcon icon={faCocktail}></FontAwesomeIcon>
  );

  const isRated = cocktail.ratingsQuantity;

  return (
    <Link to={`/cocktails/${cocktail.slug}`}>
      <div className={classes.main} onClick={onClick}>
        <div className={classes.image}>{cocktailImage}</div>
        <div className={classes.textBox}>
          <h3>{cocktail.name}</h3>
          <h6>{tagsHTML}</h6>
          <div className={`${classes.rating} ${!isRated && classes.zero}`}>
            <h3>{cocktail.ratingsAverage?.toFixed(1) || 'n/a'}</h3>
            <div className={classes.stars}>
              <StarContainer rating={cocktail.ratingsAverage || 0} />
            </div>
            <h4>({cocktail.ratingsQuantity || 0})</h4>
          </div>
        </div>
        <FaveIcon className={classes.icon} cocktailId={cocktail.id} />
        <AuthorIcon authorId={cocktail.createdBy} slug={cocktail.slug} />
      </div>
    </Link>
  );
};

export default Result;
