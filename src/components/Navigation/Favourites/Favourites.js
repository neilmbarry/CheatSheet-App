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

const Favourites = ({ className, children, onClose }) => {
  const classesList = `${classes.main} ${className}`;
  // const [faves, setFaves] = useState([]);
  const token = useSelector((state) => state.config.value.token);
  // const id = useSelector((state) => state.config.value.id);
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
        isAuthor={true}
        // fave={cocktail.createdBy === id}
      />
    );
  });

  useEffect(() => {
    if (!isOpen || !token) return;
    fetchRequest({ token });
  }, [isOpen]);

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
              {resultsJSX}
              {loading && (
                <>
                  <LoadingSpinner />
                  <LoadingSpinner />
                  <LoadingSpinner />
                  <LoadingSpinner />
                  <LoadingSpinner />
                </>
              )}
            </div>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default Favourites;
