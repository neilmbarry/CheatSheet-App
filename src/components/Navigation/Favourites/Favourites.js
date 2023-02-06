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

  const { response, fetchRequest } = useFetch('users/getFaves');

  const resultsJSX = response.data.faves?.map((cocktail, i) => {
    return <Result cocktail={cocktail} key={i} />;
  });

  useEffect(() => {
    if (!isOpen || !token) return;
    fetchRequest({ token });
  }, [isOpen, userFaves]);

  useEffect(() => {
    if (response.error) {
      store.dispatch(
        configActions.setNotification({
          type: 'fail',
          message: response.error,
        })
      );
    }
  }, [response]);

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
              <h4>My favourites</h4>
            </div>
            <div className={classes.results}>
              {response.loading && (
                <div className={classes.spinner}>
                  <LoadingSpinner type="dark" />
                </div>
              )}
              {!response.loading && resultsJSX}
              {!response.loading && !resultsJSX?.length && (
                <p className={classes.nothing}>There's nothing here!</p>
              )}
            </div>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default Favourites;
