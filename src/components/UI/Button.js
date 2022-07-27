import React from 'react';
import classes from './Button.module.css';

const Button = ({ onClick, children, className, type, disable }) => {
  const classesList = `${className} ${classes.btn} ${classes[type]} ${
    disable && classes.disable
  }`;
  return (
    <button onClick={onClick} className={classesList}>
      {children}
    </button>
  );
};

export default Button;
