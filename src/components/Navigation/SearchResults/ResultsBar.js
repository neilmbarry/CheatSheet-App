import React from 'react';
import { useSelector } from 'react-redux';
import Dropdown from '../../UI/Dropdown/Dropdown';
import classes from './ResultsBar.module.css';

const ResultsBar = ({ className, results, sortBy, sortHandler }) => {
  const classesList = `${classes.main} ${className}`;
  const query = useSelector((state) => state.config.value.searchQuery);
  return (
    <div className={classes.options}>
      <h6>
        {results} match{results !== 1 && 'es'} for '{query}'
      </h6>
      <div className={classes.dropdown}>
        <h6>Sort by:</h6>
        <Dropdown
          options={{
            rating: 'faStar',
            newest: null,
            name: null,
          }}
          selected={sortBy}
          updateValue={sortHandler}
        />
        {/* <select name="" id="">
          <option value="">rating</option>
          <option value="">newest</option>
          <option value="">relevant</option>
        </select> */}
      </div>
    </div>
  );
};

export default ResultsBar;
