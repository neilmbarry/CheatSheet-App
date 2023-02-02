import React from 'react';
import classes from './Button.module.css';
import LoadingSpinner from './Spinner';

const Button = ({ onClick, children, className, type, disable, loading }) => {
  const classesList = `${className} ${classes.btn} ${classes[type]} ${
    disable && classes.disable
  }`;

  const clickHandler = () => {
    if (loading) return;
    onClick();
  };

  return (
    <button onClick={clickHandler} className={classesList}>
      {loading ? <LoadingSpinner type="small" /> : children}
    </button>
  );
};

export default Button;
