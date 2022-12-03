import React from 'react';
import SkeletonLoading from '../../../components/UI/SkeletonLoading/SkeletonLoading';
import classes from './CocktailMethod.module.css';

const CocktailMethod = ({ className, cocktail, loading }) => {
  const classesList = `${classes.main} ${className}`;
  if (loading) {
    return (
      <div className={classesList}>
        <h3>Method</h3>
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
      </div>
    );
  }

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
