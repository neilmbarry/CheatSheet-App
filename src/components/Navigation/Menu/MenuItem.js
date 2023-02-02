import React from 'react';
import classes from './MenuItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MenuItem = ({ className, onClick, name, icon }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList} onClick={onClick}>
      <FontAwesomeIcon icon={icon} className={classes.icon} />
      <h4 className={classes.name}>{name}</h4>
    </div>
  );
};

export default MenuItem;
