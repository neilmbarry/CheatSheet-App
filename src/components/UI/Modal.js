import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
import { overlayVariants, modalVariants } from '../../config/animationVariants';

import ImageSelection from '../../pages/AddCocktail/ImageSelection/ImageSelection';

import { motion, AnimatePresence } from 'framer-motion';
import store from '../../store/store';

import configActions from '../../store/configSlice';

const Modal = ({ className, type }) => {
  const classesList = `${classes.main} ${className}`;

  console.log(type);

  const modalList = {
    imageSelection: <ImageSelection />,
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      {type && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={classes.overlay}
            onClick={() => store.dispatch(configActions.setModal(null))}
            key={1}
          ></motion.div>
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={classesList}
            key={2}
          >
            {modalList[type]}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.getElementById('portal')
  );
};

export default Modal;
