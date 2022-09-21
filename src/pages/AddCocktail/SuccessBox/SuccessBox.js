import React from 'react';
import classes from './SuccessBox.module.css';

const SuccessBox = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <h2>Your cocktail has been added!</h2>
    </div>
  );
};

export default SuccessBox;
