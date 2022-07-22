import React from 'react';
import classes from './CocktailMethod.module.css';

const CocktailMethod = ({ className, method }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <h3>Method</h3>
      {method &&
        method.map((step, i) => {
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
