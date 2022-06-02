import React from 'react';
import classes from './Button.module.css';

const Button = ({ onClick, children, className, type }) => {
  const classesList = `${className} ${classes.btn} ${classes[type]}`;
  return (
    <button onClick={onClick} className={classesList}>
      {children}
    </button>
  );
};

export default Button;
