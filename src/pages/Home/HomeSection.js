import React from 'react';
import classes from './HomeSection.module.css';
import Button from '../../components/UI/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { apiEndpoint } from '../../config/apiEndpoint';
import { useHistory } from 'react-router-dom';

const HomeSection = ({ className, photo, type, background }) => {
  const classesList = `${classes.main} ${className} ${classes[type]}`;
  const history = useHistory();

  const randomCocktailHandler = async () => {
    const response = await fetch(apiEndpoint() + 'cocktails?fields=slug');
    const data = await response.json();
    const slugsList = data.cocktails.map((entry) => entry.slug);
    console.log(slugsList);
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
              Add Cocktail
            </Button>
            <Button
              className={classes.random}
              type="large"
              onClick={randomCocktailHandler}
            >
              Random Cocktail
              <span className={classes.yellow}> &#8594;</span>
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
