import React from 'react';
import classes from './DeleteConfirm.module.css';
import Button from '../../UI/Button';
import Spinner from '../../UI/Spinner';

const DeleteConfirm = ({ className, info, confirm, onClose, loading }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <>
      <div className={classesList}>
        Are you sure you want to delete "{info.name}"?
      </div>
      <div className={classes.buttonContainer}>
        <Button onClick={confirm}>{loading ? <Spinner /> : 'Yes'}</Button>
        <Button type="alt" onClick={onClose} disable={loading}>
          Cancel
        </Button>
      </div>
    </>
  );
};

export default DeleteConfirm;
