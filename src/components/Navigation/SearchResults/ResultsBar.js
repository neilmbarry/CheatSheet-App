import React from 'react';
import classes from './ResultsBar.module.css';

const ResultsBar = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classes.options}>
      <h6>71 matching results for 'paper plane'</h6>
      <div className={classes.dropdown}>
        <h6>Sort by:</h6>
        <select name="" id="">
          <option value="">rating</option>
          <option value="">newest</option>
          <option value="">relevant</option>
        </select>
      </div>
    </div>
  );
};

export default ResultsBar;
