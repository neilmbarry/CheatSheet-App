import React from 'react';
import Button from '../UI/Button';
import NavigationSearch from './NavigationSearch';
import classes from './NavigationBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const NavigationBar = (props) => {
  return (
    <>
      <nav className={classes.nav} onClick={props.onClick}>
        <div className={classes.navLeft}>
          <NavigationSearch
            onChange={props.onChange}
            onClick={props.onSearchClick}
          />
          <Button onClick={(e) => props.onSearch(e)} className={classes.magni}>
            <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
          </Button>
        </div>
        <Link to="/">
          <h4 className={classes.navButton}>
            <span className={classes.other}>Cheat</span>
            <span className={classes.yellow}>\</span>Sheet
          </h4>
        </Link>
        <div className={classes.navRight}>
          <Link to="/add-cocktail">
            <Button>
              <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
            </Button>
          </Link>

          <Button>
            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
          </Button>

          <Link to="/login">
            <Button className={classes.yellow}>
              Log in / Sign up
              {/* <FontAwesomeIcon icon={faUser}/> */}
            </Button>
          </Link>
        </div>

        {/* <Settings /> */}
      </nav>
      {props.children}
    </>
  );
};

export default NavigationBar;
