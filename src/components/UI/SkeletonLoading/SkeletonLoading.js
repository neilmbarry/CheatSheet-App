import React from 'react';
import classes from './SkeletonLoading.module.css';

const SkeletonLoading = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return <div className={classesList}></div>;
};

export default SkeletonLoading;
