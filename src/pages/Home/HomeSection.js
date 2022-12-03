import React from 'react';
import classes from './HomeSection.module.css';
import Button from '../../components/UI/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { apiEndpoint } from '../../config/apiEndpoint';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HomeSection = ({ className, photo, type, background }) => {
  const classesList = `${classes.main} ${className} ${classes[type]}`;
  const slugsList = useSelector((state) => state.config.value.slugList);
  const history = useHistory();

  const randomCocktailHandler = () => {
    const randomEntry = Math.floor(Math.random() * slugsList.length);
    const randomCocktail = slugsList[randomEntry];

    history.push('/cocktails/' + randomCocktail);
  };
  const addCocktail = () => {
    history.push('/add-cocktail');
  };
  return (
    <div className={classesList}>
      <div className={classes.homeBox}>
        <div className={classes.textBox}>
          <h1>
            The Ultimate <span className={classes.altFont}>Cocktail</span> App
          </h1>
          <h3>
            Meet the all-in-one app for cocktail recipe searching, creating, and
            sharing.
          </h3>
          <div className={classes.buttonContainer}>
            <Button type="large" onClick={addCocktail}>
              Add a Cocktail
            </Button>
            <Button
              className={classes.random}
              type="large"
              onClick={randomCocktailHandler}
            >
              Random Cocktail
            </Button>
          </div>
        </div>
        {photo && (
          <div className={classes.imageBox}>
            <img src={photo} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeSection;
