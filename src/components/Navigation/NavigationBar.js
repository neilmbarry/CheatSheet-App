import React from 'react';
import Button from '../UI/Button';
import NavigationSearch from './NavigationSearch';
import classes from './NavigationBar.module.css';
import { Link } from 'react-router-dom';

const NavigationBar = (props) => {
  return (
    <>
      <nav className={classes.nav}>
        <Link to="/">
          <Button className={classes.navButton}>HOME</Button>
        </Link>
        <NavigationSearch />
        <Link to="/add-cocktail">
          <Button>+ Add Cocktail</Button>
        </Link>
        <Link to="/login">
          <Button>Login / Sign Up</Button>
        </Link>

        {/* <Settings /> */}
      </nav>
      {props.children}
    </>
  );
};

export default NavigationBar;
