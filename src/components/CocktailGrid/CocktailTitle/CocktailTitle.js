import React from 'react';
import classes from './CocktailTitle.module.css';
import Star from '../../UI/Star';

const CocktailTitle = ({ className, title, author, date, rating, reviews }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <h2>{title}</h2>
      <h4>by {author}</h4>
      <h5>{date}</h5>
      <div className={classes.ratings}>
        <h3>{rating}</h3>
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
        <h3>
          <span className={classes.smaller}>({reviews})</span>
        </h3>
      </div>
      {/* <h1>This is a TEST</h1>
      <h2>This is a TEST</h2>
      <h3>This is a TEST</h3>
      <h4>This is a TEST</h4>
      <h5>This is a TEST</h5>
      <h6>This is a TEST</h6>
      <p>This is a TEST</p> */}
    </div>
  );
};

export default CocktailTitle;
