import React from 'react';
import classes from './PageBreak.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCocktail } from '@fortawesome/free-solid-svg-icons';

const PageBreak = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classes.gridFooter}>
      <div className={classes.orBreak}>
        <span>
          <FontAwesomeIcon icon={faCocktail}></FontAwesomeIcon>
        </span>
      </div>
    </div>
  );
};

export default PageBreak;
