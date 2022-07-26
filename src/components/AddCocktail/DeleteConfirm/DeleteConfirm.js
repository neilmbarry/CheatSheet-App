import React from 'react';
import classes from './DeleteConfirm.module.css';
import Button from '../../UI/Button';

const DeleteConfirm = ({ className, info, confirm }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <>
      <div className={classesList}>
        Are you sure you want to delete {info.name}?
      </div>
      <div className={classes.buttonContainer}>
        <Button onClick={confirm}>Yes</Button>
        <Button type="alt">Cancel</Button>
      </div>
    </>
  );
};

export default DeleteConfirm;
