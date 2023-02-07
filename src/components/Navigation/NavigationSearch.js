import React, { useRef } from 'react';
import classes from './NavigationSearch.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import store from '../../store/store';
import configActions from '../../store/configSlice';

const NavigationSearch = ({ parentRef }) => {
  const query = useRef();

  const searchHandler = () => {
    store.dispatch(configActions.setOpenSearchResults(true));
    store.dispatch(configActions.setSearchQuery(query.current.value));
  };

  return (
    <div className={classes.searchContainer}>
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
        parentRef={parentRef}
        autoFocus={true}
      ></input>
    </div>
  );
};

export default NavigationSearch;
