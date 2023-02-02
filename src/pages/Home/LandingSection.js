import React from 'react';
import classes from './LandingSection.module.css';
import Button from '../../components/UI/Button';
import { useNavigate } from 'react-router-dom';
import iphone from '../../assets/img/iphone.png';
import { useSelector } from 'react-redux';
import store from '../../store/store';
import configActions from '../../store/configSlice';

const LandingSection = ({ className }) => {
  const classesList = `${classes.main} ${className}`;

  const navigate = useNavigate();
  const token = useSelector((state) => state.config.value.token);

  const randomCocktailHandler = () => {
    navigate('/cocktails/random');
  };
  const addCocktail = () => {
    if (token) {
      return navigate('/add-cocktail');
    }
    store.dispatch(configActions.setModal('signup'));
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

        <div className={classes.imageBox}>
          <img src={iphone} alt="iphone" />
        </div>
      </div>
    </div>
  );
};

export default LandingSection;
