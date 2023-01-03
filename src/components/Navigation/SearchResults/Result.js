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

import store from '../../../store/store';
import cocktailActions from '../../../store/localCocktailsSlice';
import { useHistory } from 'react-router';
import StarContainer from '../../UI/StarContainer';
import { useSelector } from 'react-redux';
import configActions from '../../../store/configSlice';
import { apiEndpoint } from '../../../config/apiEndpoint';

const Result = ({ onClick, isAuthor, fave, refreshFaves, cocktail }) => {
  const tagsHTML = [
    cocktail.ingredients[0].name,
    cocktail.flavour,
    cocktail.glass,
  ].join(' | ');

  const history = useHistory();

  const token = useSelector((state) => state.config.value.token);

  const toggleFaveUI = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!token) {
      return store.dispatch(
        configActions.setNotification({
          type: 'fail',
          message: 'You must be signed in to add a favourite!',
        })
      );
    }
    console.log(cocktail.id);
    const body = JSON.stringify({
      cocktailId: cocktail.id,
    });

    const url = `${apiEndpoint()}users/toggleFave`;
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body,
    })
      .then((res) => {
        console.log(res.ok);
        return res.json();
      })
      .then((data) => {
        console.log(data);

        refreshFaves();
        if (data.faveAdded) {
          return store.dispatch(
            configActions.setNotification({
              type: 'success',
              message: 'Added to favourites!',
            })
          );
        }
        store.dispatch(
          configActions.setNotification({
            type: 'info',
            message: 'Removed from favourites!',
          })
        );
        // FETCH CURRENT FAVES

        // setShowSuccessModal(true);
      })
      .catch((err) => console.warn(err));
  };

  const editHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    history.push(`/modify-cocktail/${cocktail.slug}`);
  };

  return (
    <Link to={`/cocktails/${cocktail.slug}`}>
      <div className={classes.main} onClick={onClick}>
        <div className={classes.image}>
          {cocktail.image ? (
            <img src={cocktail.image} alt="" />
          ) : (
            <FontAwesomeIcon icon={faCocktail}></FontAwesomeIcon>
          )}
        </div>
        <div className={classes.textBox}>
          <h3>{cocktail.name}</h3>
          <h6>{tagsHTML}</h6>
          <div
            className={`${classes.rating} ${
              !cocktail.ratingsQuantity && classes.zero
            }`}
          >
            <h3>{cocktail.ratingsAverage?.toFixed(1) || 'n/a'}</h3>
            <div className={classes.stars}>
              <StarContainer rating={cocktail.ratingsAverage || 0} />
            </div>
            <h4>({cocktail.ratingsQuantity || 0})</h4>
          </div>
        </div>
        <div
          className={classes.icon + ' ' + classes.fav}
          onClick={toggleFaveUI}
        >
          {fave ? (
            <FontAwesomeIcon icon={faHeartFull} />
          ) : (
            <FontAwesomeIcon icon={faHeart} />
          )}
        </div>

        {isAuthor && (
          <div
            className={classes.icon + ' ' + classes.edit}
            onClick={editHandler}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
        )}
      </div>
    </Link>
  );
};

export default Result;
