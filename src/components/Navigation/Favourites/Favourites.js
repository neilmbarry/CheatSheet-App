import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import store from '../../../store/store';
import Result from '../SearchResults/Result';

import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import configActions from '../../../store/configSlice';

import classes from './Favourites.module.css';
import { favouritesVariants } from '../../../config/animationVariants';
import Backdrop from '../../UI/Backdrop';
import useFetch from '../../../hooks/useFetch';
import LoadingSpinner from '../../UI/Spinner';

const Favourites = ({ className }) => {
  const classesList = `${classes.main} ${className}`;

  const token = useSelector((state) => state.config.value.token);
  const userFaves = useSelector((state) => state.config.value.userFaves);
  const userId = useSelector((state) => state.config.value.id);
  const isOpen = useSelector((state) => state.config.value.openFavourites);

  const closeHandler = () => {
    store.dispatch(configActions.toggleOpenFavourites());
    return;
  };

  const { loading, error, data, fetchRequest } = useFetch('users/getFaves');

  const resultsJSX = data?.faves?.map((cocktail, i) => {
    return (
      <Result
        cocktail={cocktail}
        key={i}
        image={cocktail.image}
        fave={userFaves?.includes(cocktail.id)}
        isAuthor={cocktail.createdBy === userId}
      />
    );
  });

  useEffect(() => {
    if (!isOpen || !token) return;
    fetchRequest({ token });
  }, [isOpen, userFaves]);

  useEffect(() => {
    if (error) {
      console.log('setting notification', error);
      store.dispatch(
        configActions.setNotification({
          type: 'fail',
          message: error,
        })
      );
    }
  }, [data, error]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Backdrop onClick={closeHandler}>
          <motion.div
            variants={favouritesVariants}
            animate="visible"
            initial="hidden"
            exit="exit"
            className={classesList}
          >
            <div className={classes.options}>
              <h6>My favourites</h6>
            </div>
            <div className={classes.results}>
              {loading && (
                <div className={classes.spinner}>
                  <LoadingSpinner type="dark" />
                </div>
              )}
              {resultsJSX}
              {!resultsJSX?.length && <p>Nothing</p>}
            </div>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default Favourites;
