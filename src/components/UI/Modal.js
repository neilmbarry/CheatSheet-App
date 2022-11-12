import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
import { overlayVariants, modalVariants } from '../../config/animationVariants';
import SuccessAuthModal from '../../pages/Authentication/Modals/SuccessAuthModal';
import FailAuthModal from '../../pages/Authentication/Modals/FailAuthModal';

import ImageSelection from '../../pages/AddCocktail/ImageSelection/ImageSelection';

import { motion, AnimatePresence } from 'framer-motion';
import store from '../../store/store';

import configActions from '../../store/configSlice';
import Backdrop from './Backdrop';

const Modal = ({ className, type }) => {
  const classesList = `${classes.main} ${className}`;

  const modalList = {
    imageSelection: <ImageSelection />,
    successAuth: <SuccessAuthModal />,
    failAuth: <FailAuthModal />,

    successCocktail: null,
    failCocktail: null,
    successReview: null,
    failReview: null,
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      {type && (
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
              {modalList[type]}
            </motion.div>
          </Backdrop>
        </>
      )}
    </AnimatePresence>,
    document.getElementById('portal')
  );
};

export default Modal;
