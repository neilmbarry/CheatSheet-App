import React from 'react';
import classes from './PageContainer.module.css';

import background from '../assets/img/bar.jpg';

const PageContainer = ({ className, children }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <img src={background} alt="background" className={classes.background} />
      {children}
    </div>
  );
};

export default PageContainer;
