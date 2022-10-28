import React from 'react';
import classes from './CocktailMethod.module.css';

const CocktailMethod = ({ className, cocktail }) => {
  const classesList = `${classes.main} ${className}`;
  console.log(cocktail);
  return (
    <div className={classesList}>
      <h3>Method</h3>
      {cocktail.method.map((step, i) => {
        return (
          <div key={i}>
            <p>
              {i + 1}. {step.value}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CocktailMethod;
