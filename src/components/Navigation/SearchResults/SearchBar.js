import React, { useRef } from 'react';
import classes from './SearchBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import configActions from '../../../store/configSlice';
import store from '../../../store/store';

const SearchBar = ({ className }) => {
  const query = useRef();

  const searchHandler = () => {
    store.dispatch(configActions.setSearchQuery(query.current.value));
    // fetch search query
  };

  return (
    <div className={classes.searchContainer}>
      <div className={classes.inputContainer}>
        <FontAwesomeIcon
          onClick={searchHandler}
          className={classes.magni}
          icon={faMagnifyingGlass}
        ></FontAwesomeIcon>

        <input
          className={classes.input}
          placeholder="Search over 1,000,000 cocktails..."
          onChange={searchHandler}
          ref={query}
          autoFocus
          // onClick={onClick}
        ></input>
      </div>
    </div>
  );
};

export default SearchBar;
