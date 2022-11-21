import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router';

import store from '../../store/store';
import configActions from '../../store/configSlice';

import AddCocktailBox from './AddCocktailBox/AddCocktailBox';

import { motion } from 'framer-motion';

import classes from './AddCocktailPage.module.css';

import { addCocktailVariants } from '../../config/animationVariants';
import { apiEndpoint } from '../../config/apiEndpoint';
import { useSelector } from 'react-redux';
import createCocktailActions from '../../store/createCocktailSlice';

const AddCocktail = ({ title, subtitle, type }) => {
  const token = useSelector((state) => state.config.value.token);
  const warningSent = useSelector((state) => state.config.value.authMessage);
  if (!token && !warningSent) {
    store.dispatch(configActions.setModal('authMessage'));
    store.dispatch(configActions.setAuthMessage(true));
  }
  return (
    <>
      <motion.div
        variants={addCocktailVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={classes.main}
      >
        <AddCocktailBox title={type} subtitle={subtitle} />
      </motion.div>
    </>
  );
};

export default AddCocktail;
