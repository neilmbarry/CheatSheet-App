import React from 'react';
import classes from './CocktailGrid.module.css';
import CocktailMethod from './CocktailMethod/CocktailMethod';
import CocktailReviews from './CocktailReviews/CocktailReviews';
import CocktailIngredients from './CocktailIngredients/CocktailIngredients';
import CocktailTitle from './CocktailTitle/CocktailTitle';
import photo from '../../assets/img/paper.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCocktail, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons';
import { useParams } from 'react-router';
import store from '../../store/store';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toggleFave } from '../../store/cocktails';

const CocktailGrid = () => {
  const { slug } = useParams();
  const [cocktail, setCocktail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFave, setIsFav] = useState(false);

  // console.log('HERE');

  const variants = {
    hidden: {
      y: -100,
      opacity: 0,
      // scale: 0.8,

      // rotate: "0deg",
    },
    visible: {
      y: 0,
      opacity: 1,

      transition: {
        type: 'spring',
        // delay: 0.5,
        duration: 0.5,
      },
    },
    exit: {
      y: 100,
      opacity: 0,
      // scale: 0.9,
      transition: {
        type: 'spring',
        // delay: 0.5,
        duration: 0.3,
      },
    },
  };

  const toggleFav = (slug) => {
    store.dispatch(toggleFave(slug));
    setIsFav((prev) => !prev);
  };

  useEffect(() => {
    const cocktailInfo = store
      .getState()
      .cocktails.value.cocktails.find((el) => el.slug === slug);
    if (!cocktailInfo) {
      setIsLoading(false);
      return console.warn('No cocktail found');
    }
    const isFav = store
      .getState()
      .cocktails.value.faves.includes(cocktailInfo.slug);
    // console.log(cocktailInfo);
    setCocktail(cocktailInfo);
    setIsFav(isFav);
    setIsLoading(false);
    return;
  }, [slug]);

  const loadedCocktailGrid = (
    <div className={classes.cocktailGrid}>
      <CocktailTitle
        className={classes.title}
        title={cocktail.name}
        author={`${cocktail.author}, Sydney, Australia`}
        date="January 19, 2022"
        rating={'4.9'}
        reviews="102"
      />
      <div className={classes.pic}>
        <div
          className={classes.favIcon}
          onClick={() => toggleFav(cocktail.slug)}
        >
          {isFave ? (
            <FontAwesomeIcon icon={faHeart} />
          ) : (
            <FontAwesomeIcon icon={faHeartEmpty} />
          )}
        </div>
        <img src={cocktail.image} alt="" className={classes.image} />
      </div>
      <CocktailIngredients
        className={classes.ing}
        ingredients={cocktail.ingredients}
      />
      <CocktailMethod className={classes.method} method={cocktail.recipe} />

      <CocktailReviews className={classes.rev} />
      <div className={classes.gridFooter}>
        <div className={classes.orBreak}>
          <span>
            <FontAwesomeIcon icon={faCocktail}></FontAwesomeIcon>
          </span>
        </div>
      </div>
    </div>
  );

  const loadingCocktailGrid = (
    <div className={classes.cocktailGrid}>
      <CocktailTitle />
      <div className={classes.pic}></div>
      <CocktailIngredients className={classes.ing} />
      <CocktailMethod className={classes.method} />
      <CocktailReviews className={classes.rev} />
      <div className={classes.gridFooter}>
        <div className={classes.orBreak}>
          <span>
            <FontAwesomeIcon icon={faCocktail}></FontAwesomeIcon>
          </span>
        </div>
      </div>
    </div>
  );

  const notFoundMessage = <div>Couldn't locate that cocktail!</div>;

  return (
    <>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        exit={variants.exit}
        className={classes.cocktailPage}
      >
        {isLoading && loadingCocktailGrid}
        {!isLoading && cocktail.name && loadedCocktailGrid}
        {!isLoading && !cocktail.name && notFoundMessage}
      </motion.div>
    </>
  );
};

export default CocktailGrid;
