import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import store from '../../store/store';
import configActions from '../../store/configSlice';

import AddCocktailBox from './AddCocktailBox/AddCocktailBox';

import { motion } from 'framer-motion';

import classes from './AddCocktailPage.module.css';

import { addCocktailVariants } from '../../config/animationVariants';

import { useSelector } from 'react-redux';

const AddCocktail = ({ title, type }) => {
  const token = useSelector((state) => state.config.value.token);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      store.dispatch(configActions.setModal('signup'));
      navigate('/');
    }
  }, [token, navigate]);
  return (
    <>
      <motion.div
        variants={addCocktailVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={classes.main}
      >
        <AddCocktailBox title={title} type={type} />
      </motion.div>
    </>
  );
};

export default AddCocktail;
