import React from 'react';
import classes from './Button.module.css';

const Button = ({ onClick, children, className }) => {
  const classesList = `${className} ${classes.btn}`;
  return (
    <button onClick={onClick} className={classesList}>
      {children}
    </button>
  );
};

export default Button;
