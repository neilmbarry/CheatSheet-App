import React, { useEffect, useState } from 'react';
import classes from './Result.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartFull } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

import { faCocktail } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router';
import StarContainer from '../../UI/StarContainer';
import { useSelector } from 'react-redux';
import FaveIcon from '../../UI/FaveIcon/FaveIcon';
import AuthorIcon from '../../UI/AuthorIcon/AuthorIcon';

const Result = ({ onClick, isAuthor, cocktail }) => {
  const tagsHTML = [
    cocktail.ingredients[0].name,
    cocktail.flavour,
    cocktail.glass,
  ].join(' | ');

  const navigate = useNavigate();



  const editHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/modify-cocktail/${cocktail.slug}`);
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
        <FaveIcon
          className={classes.icon + ' ' + classes.fav}
          cocktailId={cocktail.id}
        />
        <AuthorIcon authorId={cocktail.createdBy} slug={cocktail.slug} />

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
