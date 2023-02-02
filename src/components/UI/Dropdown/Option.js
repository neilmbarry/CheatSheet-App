import React from 'react';
import classes from './Option.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Option = ({ className, onClick, icon, name, invalid }) => {
  const classesList = `${classes.main} ${className} ${
    invalid && classes.invalid
  }`;
  return (
    <div className={classesList} onClick={onClick}>
      {icon && <FontAwesomeIcon className={classes.icon} icon={icon} />}
      {name.charAt(0).toUpperCase() + name.slice(1)}
    </div>
  );
};

export default Option;
