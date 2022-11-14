import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import store from '../../../store/store';
import Result from '../SearchResults/Result';

import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import configActions from '../../../store/configSlice';

import classes from './Favourites.module.css';
import { favouritesVariants } from '../../../config/animationVariants';
import { apiEndpoint } from '../../../config/apiEndpoint';
import Backdrop from '../../UI/Backdrop';
import useFetch from '../../../hooks/useFetch';

const Favourites = ({ className, children, onClose }) => {
  const classesList = `${classes.main} ${className}`;
  // const [faves, setFaves] = useState([]);
  // const token = useSelector((state) => state.config.value.token);
  // const id = useSelector((state) => state.config.value.id);
  const isOpen = useSelector((state) => state.config.value.openFavourites);

  const closeHandler = () => {
    store.dispatch(configActions.toggleOpenFavourites());
    return;
  };

  const { data, loading } = useFetch({
    url: 'users/getFaves',
    reload: isOpen === true,
  });

  console.log(data);

  const favesIdString = data?.faves
    .map((favId) => {
      return `_id=${favId}`;
    })
    .join('&');

  console.log(favesIdString);

  const { data: faves } = useFetch({
    url: `cocktails?${favesIdString?.length > 0 || 'name=null'}`,
    reload: isOpen === true,
  });

  console.log(faves);

  // const resultsJSX = faves?.faves.map((cocktail, i) => {
  //   return (
  //     <Result
  //       cocktail={cocktail}
  //       key={i}
  //       image={cocktail.image}
  //       isAuthor={true}
  //       // fave={cocktail.createdBy === id}
  //     />
  //   );
  // });

  const resultsJSX = null;

  // useEffect(() => {
  //   fetch(apiEndpoint() + '')
  //     .then((res) => res.json())
  //     .then((data) => setFaves(data))
  //     .catch((err) => console.warn(err));
  // }, [isOpen]);

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
            <div className={classes.results}>{resultsJSX}</div>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default Favourites;
