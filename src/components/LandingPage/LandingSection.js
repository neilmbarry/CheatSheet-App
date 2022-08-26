import React from 'react';
import classes from './LandingSection.module.css';
import Button from '../UI/Button';
import { Link } from 'react-router-dom';

const LandingSection = ({ className, photo, type, background }) => {
  const classesList = `${classes.main} ${className} ${classes[type]}`;
  return (
    <div className={classesList}>
      <div className={classes.landingBox}>
        <div className={classes.textBox}>
          <h1>
            The Ultimate <span className={classes.altFont}>Cocktail</span> App
          </h1>
          <h3>
            Meet the all-in-one app for cocktail recipe searching, creating, and
            sharing.
          </h3>
          <Link to="/cocktails/TheLastWord">
            <Button type="large">
              Random Cocktail
              <span className={classes.yellow}> &#8594;</span>
            </Button>
          </Link>
        </div>
        {photo && (
          <div className={classes.imageBox}>
            <img src={photo} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingSection;
