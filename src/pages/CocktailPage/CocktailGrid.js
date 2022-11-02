import React from 'react';
import classes from './CocktailGrid.module.css';
import CocktailMethod from './CocktailMethod/CocktailMethod';
import CocktailReviews from './CocktailReviews/CocktailReviews';
import CocktailIngredients from './CocktailIngredients/CocktailIngredients';
import CocktailTitle from './CocktailTitle/CocktailTitle';
import CocktailImage from './CocktailImage/CocktailImage';
import PageBreak from '../../components/UI/PageBreak';
// import photo from '../../assets/img/paper.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCocktail, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons';
import { useParams } from 'react-router';
import store from '../../store/store';
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { motion, AnimatePresence } from 'framer-motion';
import cocktailActions from '../../store/localCocktailsSlice';
import { apiEndpoint } from '../../config/apiEndpoint';
import { cocktailGridVariants } from '../../config/animationVariants';

const CocktailGrid = () => {
  const { slug } = useParams();

  const { loading, data, error } = useFetch({
    url: `cocktails?slug=${slug}`,
  });

  const cocktail = data?.cocktails[0];
  console.log(cocktail);

  return (
    <>
      <motion.div
        variants={cocktailGridVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={classes.cocktailPage}
      >
        <div className={classes.cocktailGrid}>
          {cocktail && (
            <>
              <CocktailTitle
                className={classes.title}
                cocktail={cocktail}
                loading={true}
              />
              <CocktailImage cocktail={cocktail} loading={true} />
              <CocktailIngredients
                className={classes.ing}
                cocktail={cocktail}
                loading={true}
              />
              <CocktailMethod
                className={classes.method}
                cocktail={cocktail}
                loading={true}
              />
              <CocktailReviews className={classes.rev} loading={true} />
              <PageBreak />
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default CocktailGrid;
