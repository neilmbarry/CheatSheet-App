import React from 'react';
import classes from './SuccessAuthModal.module.css';

const SuccessAuthModal = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return <div className={classesList}>SuccessAuthModal</div>;
};

export default SuccessAuthModal;
