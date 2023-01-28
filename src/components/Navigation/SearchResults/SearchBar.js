import React from 'react';
import classes from './SearchBar.module.css';
// import Search from '../../Navigation/';
import NavigationSearch from '../NavigationSearch';

const SearchBar = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <NavigationSearch />
      {/* <input className={classes.input} type="text" /> */}
    </div>
  );
};

export default SearchBar;
