import React, { useEffect } from 'react';
import classes from './CocktailGrid.module.css';
import CocktailMethod from './CocktailMethod/CocktailMethod';
import CocktailReviews from './CocktailReviews/CocktailReviews';
import CocktailIngredients from './CocktailIngredients/CocktailIngredients';
import CocktailTitle from './CocktailTitle/CocktailTitle';
import CocktailImage from './CocktailImage/CocktailImage';
import PageBreak from '../../components/UI/PageBreak';
import { useNavigate, useParams } from 'react-router';

import useFetch from '../../hooks/useFetch';
import { motion } from 'framer-motion';
import { cocktailGridVariants } from '../../config/animationVariants';
import store from '../../store/store';
import configActions from '../../store/configSlice';

const CocktailGrid = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { response, fetchRequest } = useFetch(`cocktails/${slug}`);

  const cocktail = response.data.cocktail;

  console.log(cocktail);

  useEffect(() => {
    fetchRequest({});
  }, []);

  useEffect(() => {
    if (response.data.status === 'success') {
      store.dispatch(
        configActions.setCurrentCocktailId(response.data.cocktail.id)
      );
      console.log(response.data.cocktail.slug);
      store.dispatch(
        configActions.setCurrentCocktailSlug(response.data.cocktail.slug)
      );
    }
    if (response.error) {
      console.log('setting notification', response.error);
      store.dispatch(
        configActions.setNotification({
          type: 'fail',
          message: response.error,
        })
      );
      navigate('/');
    }
  }, [response, navigate]);

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
          <CocktailTitle
            className={classes.title}
            cocktail={cocktail}
            loading={response.loading}
          />
          <CocktailImage cocktail={cocktail} loading={response.loading} />
          <CocktailIngredients
            className={classes.ing}
            cocktail={cocktail}
            loading={response.loading}
          />
          <CocktailMethod
            className={classes.method}
            cocktail={cocktail}
            loading={response.loading}
          />
          <CocktailReviews
            className={classes.rev}
            loading={response.loading}
            cocktail={cocktail}
          />
          <PageBreak />
        </div>
      </motion.div>
    </>
  );
};

export default CocktailGrid;
