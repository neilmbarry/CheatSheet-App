import React from 'react';
import classes from './NavigationSearch.module.css';

const NavigationSearch = ({ onChange, onClick }) => {
  return (
    <input
      className={classes.input}
      placeholder="Search over 1,000,000 cocktails..."
      onChange={onChange}
      // onClick={onClick}
    ></input>
  );
};

export default NavigationSearch;
