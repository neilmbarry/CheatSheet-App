import React from 'react';
import classes from './CocktailMethod.module.css';

const CocktailMethod = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <h3>Method</h3>
      <p>
        1. Combine amaro, Aperol, bourbon, and lemon juice in a cocktail shaker.
      </p>
      <p>
        2. Fill with ice and shake vigorously until outside of shaker is frosty,
        about 20 seconds.
      </p>
      <p> 3. Strain into chilled coupe glasses</p>
      <p>
        1. Combine amaro, Aperol, bourbon, and lemon juice in a cocktail shaker.
      </p>
      <p>
        2. Fill with ice and shake vigorously until outside of shaker is frosty,
        about 20 seconds.
      </p>
      <p> 3. Strain into chilled coupe glasses</p>
    </div>
  );
};

export default CocktailMethod;
