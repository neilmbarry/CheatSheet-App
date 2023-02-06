import React from 'react';
import classes from './Pagination.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ className, currPage, totalPages, changePageHandler }) => {
  const classesList = `${classes.main} ${className}`;
  const pageList = [];
  for (let i = 1; i <= totalPages; i++) {
    pageList.push(
      <h4
        className={`${classes.number} ${currPage !== i && classes.grey}`}
        onClick={() => {
          changePageHandler(i);
        }}
        key={i}
      >
        {i}
      </h4>
    );
  }

  if (totalPages === 1) {
    return <></>;
  }

  return (
    <div className={classesList}>
      <FontAwesomeIcon
        icon={faChevronLeft}
        className={`${classes.chevron} ${currPage <= 1 && classes.unavailable}`}
        onClick={() => {
          changePageHandler(currPage - 1);
        }}
      />
      {pageList}
      <FontAwesomeIcon
        icon={faChevronRight}
        className={`${classes.chevron} ${
          currPage >= totalPages && classes.unavailable
        }`}
        onClick={() => {
          changePageHandler(currPage + 1);
        }}
      />
    </div>
  );
};

export default Pagination;
