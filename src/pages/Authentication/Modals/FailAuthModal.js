import React from 'react';
import classes from './FailAuthModal.module.css';

const FailAuthModal = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return <div className={classesList}>FailAuthModal</div>;
};

export default FailAuthModal;
