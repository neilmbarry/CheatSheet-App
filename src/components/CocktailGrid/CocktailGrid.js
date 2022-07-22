import React from 'react';
import classes from './CocktailGrid.module.css';
import CocktailMethod from './CocktailMethod/CocktailMethod';
import CocktailReviews from './CocktailReviews/CocktailReviews';
import CocktailIngredients from './CocktailIngredients/CocktailIngredients';
import CocktailTitle from './CocktailTitle/CocktailTitle';
import photo from '../../img/paper.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCocktail } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router';
import store from '../../store/store';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CocktailGrid = () => {
  const { slug } = useParams();
  const [cocktail, setCocktail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  console.log('HERE');

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
      y: -100,
      opacity: 0,
      // scale: 0.9,
      transition: {
        type: 'spring',
        // delay: 0.5,
        duration: 0.3,
      },
    },
  };

  useEffect(() => {
    const cocktailInfo = store
      .getState()
      .cocktails.value.cocktails.find((el) => el.slug === slug);
    if (!cocktailInfo) {
      console.warn('No cocktail found');
    }
    console.log(cocktailInfo);
    setCocktail(cocktailInfo);
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
      <CocktailTitle
      // className={classes.title}
      // title={cocktail.name}
      // author={`${cocktail.author}, Sydney, Australia`}
      // date="January 19, 2022"
      // rating={'4.9'}
      // reviews="102"
      />
      <div className={classes.pic}>
        {/* <img src={cocktail.image} alt="" className={classes.image} /> */}
      </div>
      <CocktailIngredients
        className={classes.ing}
        // ingredients={cocktail.ingredients}
      />
      <CocktailMethod
        className={classes.method}
        // method={cocktail.recipe}
      />

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

  return (
    <>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        exit={variants.exit}
        className={classes.cocktailPage}
      >
        {isLoading ? loadingCocktailGrid : loadedCocktailGrid}
      </motion.div>
    </>
  );
};

export default CocktailGrid;
