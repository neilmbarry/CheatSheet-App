import React from 'react';
import classes from './Pagination.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ className }) => {
  const classesList = `${classes.main} ${className}`;

  return (
    <div className={classesList}>
      <FontAwesomeIcon icon={faChevronLeft} />
      <h4 className={classes.number}>1</h4>
      <h4 className={classes.number}>2</h4>
      <h4 className={classes.number}>3</h4>
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
};

export default Pagination;
