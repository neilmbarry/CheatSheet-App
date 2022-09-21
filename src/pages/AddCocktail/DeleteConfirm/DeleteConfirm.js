import React from 'react';
import classes from './DeleteConfirm.module.css';
import Button from '../../../components/UI/Button';
import Spinner from '../../../components/UI/Spinner';
import store from '../../../store/store';

const DeleteConfirm = ({ className, info, confirm, onClose }) => {
  const classesList = `${classes.main} ${className}`;
  const loading = store.getState().config.value.loading;
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
