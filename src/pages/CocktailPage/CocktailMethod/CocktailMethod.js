import React from 'react';
import classes from './CocktailMethod.module.css';

const CocktailMethod = ({ className, cocktail, loading }) => {
  const classesList = `${classes.main} ${className}`;
  if (loading) {
    return (
      <div className={classesList}>
        <h3>Method</h3>
        <h4>Loading...</h4>
      </div>
    );
  }

  console.log(cocktail);
  return (
    <div className={classesList}>
      <h3>Method</h3>
      {cocktail?.method.map((step, i) => {
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
