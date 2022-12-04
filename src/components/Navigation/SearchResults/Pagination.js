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

  console.log(currPage);

  if (totalPages === 1) {
    return (
      <>
        <h4>No pagination</h4>
      </>
    );
  }

  return (
    <div className={classesList}>
      {/* <h4>
        current page is {currPage}, total pages is {totalPages}
      </h4> */}

      <FontAwesomeIcon
        icon={faChevronLeft}
        className={`${classes.chevron} ${currPage <= 1 && classes.unavailable}`}
        onClick={() => {
          changePageHandler(currPage - 1);
        }}
      />

      {pageList}
      {/* <h4 className={classes.number}>1</h4>
      <h4 className={classes.number}>2</h4>
      <h4 className={classes.number}>3</h4> */}

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
