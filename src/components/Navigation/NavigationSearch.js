import React from 'react';
import classes from './NavigationSearch.module.css';

const NavigationSearch = () => {
  return (
    <input
      className={classes.input}
      placeholder="Search over 1,000,000 cocktails..."
    ></input>
  );
};

export default NavigationSearch;
