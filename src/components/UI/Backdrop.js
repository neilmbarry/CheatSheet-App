import React from 'react';
import classes from './Backdrop.module.css';
import { motion } from 'framer-motion';
import { backdropVariants } from '../../config/animationVariants';

const Backdrop = ({ onClick, children }) => {
  return (
    <motion.div
      className={classes.backdrop}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      id="backdrop"
      onClick={(e) => {
        if (e.target.id !== 'backdrop') return;
        onClick();
      }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
