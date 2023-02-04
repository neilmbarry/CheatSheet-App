import React from 'react';
import classes from './CocktailImage.module.css';
import LoadingSpinner from '../../../components/UI/Spinner';
import FaveIcon from '../../../components/UI/FaveIcon/FaveIcon';
import AuthorIcon from '../../../components/UI/AuthorIcon/AuthorIcon';

const CocktailImage = ({ className, cocktail, loading }) => {
  const classesList = `${classes.main} ${className}`;

  if (loading) {
    return (
      <div className={`${classesList} ${classes.loading}`}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={classesList}>
      <FaveIcon className={classes.favIcon} cocktailId={cocktail?.id} />
      <img src={cocktail?.image} alt="cocktail" className={classes.image} />
      <AuthorIcon authorId={cocktail?.createdBy} slug={cocktail?.slug} />
    </div>
  );
};

export default CocktailImage;
