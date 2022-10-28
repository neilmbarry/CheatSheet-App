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
import { motion, AnimatePresence } from 'framer-motion';
import cocktailActions from '../../store/localCocktailsSlice';
import { apiEndpoint } from '../../config/apiEndpoint';

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
    store.dispatch(cocktailActions.toggleFave(slug));
    setIsFav((prev) => !prev);
  };

  useEffect(() => {
    if (!slug) return;
    fetch(`${apiEndpoint()}api/v1/cocktails?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCocktail(data.cocktails[0]);
        setIsLoading(false);
      })
      .catch((err) => console.warn(err));
    return;
  }, [slug]);

  console.log(cocktail);

  const loadedCocktailGrid = (
    <div className={classes.cocktailGrid}>
      <CocktailTitle className={classes.title} cocktail={cocktail} />
      <CocktailImage cocktail={cocktail} />
      <CocktailIngredients className={classes.ing} cocktail={cocktail} />
      <CocktailMethod className={classes.method} cocktail={cocktail} />

      <CocktailReviews className={classes.rev} />
      <PageBreak />
      {/* <div className={classes.gridFooter}>
        <div className={classes.orBreak}>
          <span>
            <FontAwesomeIcon icon={faCocktail}></FontAwesomeIcon>
          </span>
        </div>
      </div> */}
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
        {/* {isLoading && loadingCocktailGrid} */}
        {!isLoading && cocktail?.name && loadedCocktailGrid}
        {!isLoading && !cocktail?.name && notFoundMessage}
        {/* {loadingCocktailGrid} */}
      </motion.div>
    </>
  );
};

export default CocktailGrid;
