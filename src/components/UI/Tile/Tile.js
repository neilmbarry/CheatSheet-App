import React from 'react';
import classes from './Tile.module.css';

const Tile = ({ className, children, title }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      {title && <h2 className={classes.title}>{title}</h2>}
      <div className={classes.children}>{children}</div>
    </div>
  );
};

export default Tile;
