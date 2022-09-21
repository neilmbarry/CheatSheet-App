import React from 'react';
import classes from './HomeSubsection.module.css';
import Button from '../../components/UI/Button';

const HomeSubsection = ({ className, photo }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <div className={classes.homeBox}>
        <div className={classes.textBox}>
          <h2>About Cheat\Sheet</h2>
        </div>
        <div className={classes.imageBox}>
          <h3>
            Cheat\Sheet is a sleek multiplatform recipe manager, accessible on
            and offline, across your Apple iOS or Android devices, on your
            tablet, laptop or desktop. Import recipes from the web and even
            physical media using our free real-time recipe scanning (OCR).
          </h3>
        </div>
      </div>
    </div>
  );
};

export default HomeSubsection;
