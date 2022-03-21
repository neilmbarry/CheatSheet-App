import React from 'react';
import Button from '../UI/Button';
import NavigationSearch from './NavigationSearch';
import classes from './NavigationBar.module.css';
import { Link } from 'react-router-dom';

const NavigationBar = (props) => {
  return (
    <>
      <nav className={classes.nav}>
        <div className={classes.navLeft}>
          <Link to="/">
            <h4 className={classes.navButton}>
              <span className={classes.other}>C</span>S'
            </h4>
          </Link>
          <NavigationSearch />
        </div>
        <div className={classes.navRight}>
          <Link to="/add-cocktail">
            <Button>+ Add</Button>
          </Link>
          <Link to="/login">
            <Button>Faves</Button>
          </Link>
          <Button className={classes.yellow}>Profile</Button>
        </div>

        {/* <Settings /> */}
      </nav>
      {props.children}
    </>
  );
};

export default NavigationBar;
