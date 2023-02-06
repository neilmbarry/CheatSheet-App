import React from 'react';
import { useSelector } from 'react-redux';
import Dropdown from '../../UI/Dropdown/Dropdown';
import classes from './ResultsBar.module.css';

const ResultsBar = ({
  className,
  results,
  sortBy,
  sortHandler,
  searchTerm,
}) => {
  const classesList = `${classes.main} ${className}`;
  const query = useSelector((state) => state.config.value.searchQuery);
  if (!searchTerm) return <></>;
  return (
    <div className={classes.options}>
      <h6>
        {results} match{results !== 1 && 'es'} for '{query}'
      </h6>
      <div className={classes.dropdown}>
        <h6>Sort by:</h6>
        <Dropdown
          options={{
            rating: null,
            newest: null,
            name: null,
          }}
          selected={sortBy}
          updateValue={sortHandler}
        />
      </div>
    </div>
  );
};

export default ResultsBar;
