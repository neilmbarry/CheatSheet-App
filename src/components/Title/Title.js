import React from 'react';
import classes from './Title.module.css';

const Title = ({ className, title, subtitle }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <>
      <h2>{title}</h2>
      <h6>{subtitle}</h6>
    </>
  );
};

export default Title;
