import React from 'react';
import classes from './CocktailTitle.module.css';
// import Star from '../../UI/Star';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfStroke, faStar } from '@fortawesome/free-solid-svg-icons';
import StarContainer from '../../../components/UI/StarContainer';
import LoadingSpinner from '../../../components/UI/Spinner';
import SkeletonLoading from '../../../components/UI/SkeletonLoading/SkeletonLoading';

const CocktailTitle = ({ className, cocktail, loading }) => {
  const classesList = `${classes.main} ${className}`;
  const title = cocktail?.name;
  const author = `${cocktail?.author || 'Anonymous'}`;
  const date = new Date(Date.parse(cocktail?.createdAt));

  if (loading) {
    return (
      <div className={`${classes.loading} ${className}`}>
        <SkeletonLoading className={classes.larger} />
        <SkeletonLoading />
        <SkeletonLoading />
      </div>
    );
  }

  return (
    <div className={classesList}>
      <h1>{title}</h1>
      <h4>by {author}</h4>
      <h5>{date.toLocaleString('en-GB').split(',')[0]}</h5>
      {/* <SkeletonLoading className={classes.larger} />
      <SkeletonLoading />
      <SkeletonLoading /> */}
      <div className={classes.ratings}>
        <h3>{cocktail.ratingsAverage?.toFixed(1) || 0}</h3>
        <div className={classes.stars}>
          <StarContainer rating={cocktail.ratingsAverage} />
        </div>

        <h3>
          <span className={classes.smaller}>
            ({cocktail.ratingsQuantity || 0})
          </span>
        </h3>
      </div>
      <h3>{cocktail.glass}</h3>
      <h3>{cocktail.flavour}</h3>
    </div>
  );
};

export default CocktailTitle;
