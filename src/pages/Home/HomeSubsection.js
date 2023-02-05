import React from 'react';
import classes from './HomeSubsection.module.css';
import Button from '../../components/UI/Button';

const HomeSubsection = ({ className, photo }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <div className={classes.homeBox}>
        <div className={classes.textBox}>
          <h2>About Cheat/Sheet</h2>
        </div>
        <div className={classes.imageBox}>
          <h3>
            With Cheat/Sheet you can search our online database for all your
            most loved cocktail recipes. You can also save them to your
            favourites, rate, review and create your own! So give it a go!
          </h3>
        </div>
      </div>
    </div>
  );
};

export default HomeSubsection;
