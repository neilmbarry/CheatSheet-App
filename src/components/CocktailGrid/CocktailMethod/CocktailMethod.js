import React from 'react';
import classes from './CocktailMethod.module.css';

const CocktailMethod = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <h3>Preparations</h3>
    </div>
  );
};

export default CocktailMethod;
