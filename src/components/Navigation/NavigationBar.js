// Main imports
import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import classes from './NavigationBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

// State management
import store from '../../store/store';
import configActions from '../../store/configSlice';

const NavigationBar = ({ children }) => {
  const toggleSearch = () => {
    store.dispatch(configActions.toggleOpenSearch());
  };

  const toggleMenu = () => {
    store.dispatch(configActions.toggleMenu());
  };

  return (
    <>
      <div className={classes.navContainer}>
        <nav className={classes.nav} onClick={null}>
          <div className={classes.navLeft}>
            <FontAwesomeIcon
              className={classes.magni}
              icon={faMagnifyingGlass}
              onClick={toggleSearch}
            ></FontAwesomeIcon>
          </div>
          <Link to="/">
            <h4 className={classes.navButton}>
              <span className={classes.yellow}>Cheat</span>
              <span className={classes.slash}>/</span>
              <span className={classes.green}>Sheet</span>
            </h4>
          </Link>
          <div className={classes.navRight}>
            <div className={classes.menuIcon}>
              <FontAwesomeIcon
                icon={faBars}
                onClick={toggleMenu}
                className={classes.magni}
              />
            </div>
          </div>
        </nav>
      </div>
      {children}
    </>
  );
};

export default NavigationBar;
