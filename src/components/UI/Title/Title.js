import React from 'react';
import classes from './Title.module.css';

const Title = ({ className, title, subtitle }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <h2 className={classes.title}>{title}</h2>
      <h6 className={classes.subTitle}>{subtitle}</h6>
    </div>
  );
};

export default Title;
