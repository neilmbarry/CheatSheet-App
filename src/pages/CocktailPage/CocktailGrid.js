import React from 'react';
import classes from './CocktailGrid.module.css';
import CocktailMethod from './CocktailMethod/CocktailMethod';
import CocktailReviews from './CocktailReviews/CocktailReviews';
import CocktailIngredients from './CocktailIngredients/CocktailIngredients';
import CocktailTitle from './CocktailTitle/CocktailTitle';
import CocktailImage from './CocktailImage/CocktailImage';
import PageBreak from '../../components/UI/PageBreak';
import { useParams } from 'react-router';

import useFetch from '../../hooks/useFetch';
import { motion, AnimatePresence } from 'framer-motion';

import { cocktailGridVariants } from '../../config/animationVariants';

const CocktailGrid = () => {
  const { slug } = useParams();

  const { loading, data, error } = useFetch({
    url: `cocktails?slug=${slug}`,
    reload: slug,
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
                loading={loading}
              />
              <CocktailImage cocktail={cocktail} loading={loading} />
              <CocktailIngredients
                className={classes.ing}
                cocktail={cocktail}
                loading={loading}
              />
              <CocktailMethod
                className={classes.method}
                cocktail={cocktail}
                loading={loading}
              />
              <CocktailReviews className={classes.rev} loading={loading} />
              <PageBreak />
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default CocktailGrid;
