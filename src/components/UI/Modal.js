import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
import { modalVariants } from '../../config/animationVariants';

import AddReviewModal from '../../pages/CocktailPage/CocktailReviews/AddReviewModal';
import ReviewsModal from '../../pages/CocktailPage/CocktailReviews/ReviewsModal';

import ImageSelection from '../../pages/AddCocktail/ImageSelection/ImageSelection';

import { motion, AnimatePresence } from 'framer-motion';
import store from '../../store/store';

import configActions from '../../store/configSlice';
import Backdrop from './Backdrop';
import { useSelector } from 'react-redux';

import AuthModal from '../../pages/Authentication/AuthModal';

const modalList = {
  imageSelection: <ImageSelection />,
  addReview: <AddReviewModal />,
  reviews: <ReviewsModal />,
  login: <AuthModal />,
  signup: <AuthModal />,
};

const Modal = ({ className, type }) => {
  const classesList = `${classes.main} ${className}`;

  const modal = useSelector((state) => state.config.value.modal);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {modal && (
        <>
          <Backdrop
            onClick={() => store.dispatch(configActions.setModal(null))}
          >
            <div className={classes.temp}></div>
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={classesList}
              key={2}
            >
              {modalList[modal]}
            </motion.div>
          </Backdrop>
        </>
      )}
    </AnimatePresence>,
    document.getElementById('portal')
  );
};

export default Modal;
