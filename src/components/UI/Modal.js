import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ className, onClose, children }) => {
  const classesList = `${classes.main} ${className}`;

  //   const socket = useSocket();
  const overlayVariants = {
    hidden: {
      // y: -100,
      opacity: 0,
      // scale: 0.8,

      // rotate: "0deg",
    },
    visible: {
      // y: 0,
      opacity: 1,

      transition: {
        // type: 'spring',
        // delay: 0.5,
        duration: 0.2,
      },
    },
    exit: {
      // y: -30,
      opacity: 0,
      // scale: 0.9,
      transition: {
        // type: "spring",
        // delay: 0.5,
        duration: 0.3,
      },
    },
  };

  const modalVariants = {
    hidden: {
      y: '-30%',
      x: '-50%',
      opacity: 0,
      // scale: 0.8,

      // rotate: "0deg",
    },
    visible: {
      y: '-50%',
      opacity: 1,

      transition: {
        type: 'spring',
        // delay: 0.5,
        duration: 0.5,
      },
    },
    exit: {
      y: -30,
      opacity: 0,
      // scale: 0.9,
      transition: {
        // type: "spring",
        // delay: 0.5,
        duration: 0.3,
      },
    },
  };

  return ReactDOM.createPortal(
    <div>
      <AnimatePresence>
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit={overlayVariants.exit}
          className={classes.overlay}
          onClick={onClose}
          key={1}
        ></motion.div>
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit={modalVariants.exit}
          className={classesList}
          key={2}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>,
    document.getElementById('portal')
  );
};

export default Modal;
