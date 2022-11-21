import React from 'react';
import classes from './AuthMessage.module.css';

const AuthMessage = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <h2>You must be signed in to add a cocktail</h2>
    </div>
  );
};

export default AuthMessage;
