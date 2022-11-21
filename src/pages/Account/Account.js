import React from 'react';
import classes from './Account.module.css';

const Account = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <h1>Account</h1>
      <h1>Account</h1>
      <h1>Account</h1>
      <h1>Account</h1>
      <h1>Account</h1>
      <h1>Account</h1>
      <h1>Account</h1>
    </div>
  );
};

export default Account;
