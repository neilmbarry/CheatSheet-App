import React from 'react';
import classes from './DeleteButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const DeleteButton = ({ className, onClick }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList} onClick={onClick}>
      <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
    </div>
  );
};

export default DeleteButton;
