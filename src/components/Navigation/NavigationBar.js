import React, { useEffect, useState } from 'react';
import Button from '../UI/Button';

import classes from './NavigationBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import store from '../../store/store';
import { useSelector } from 'react-redux';

import configActions from '../../store/configSlice';
import useFetch from '../../hooks/useFetch';

const NavigationBar = ({ children }) => {
  const token = useSelector((state) => state.config.value.token);

  const navigate = useNavigate();

  const [name, setName] = useState(null);

  const toggleFavourites = () => {
    store.dispatch(configActions.toggleOpenFavourites());
  };

  const toggleSearch = () => {
    console.log('toggling search');
    store.dispatch(configActions.toggleOpenSearch());
  };

  const menuHandler = () => {
    store.dispatch(configActions.toggleMenu());
  };

  const { loading, data, error, fetchRequest } = useFetch('users/me');

  useEffect(() => {
    if (!token) {
      return setName(null);
    }
    fetchRequest({
      token,
    });
  }, [token]);

  useEffect(() => {
    if (data.status === 'success') {
      setName(data.user.username);
    }
  }, [data]);

  const randomCocktailHandler = () => {
    navigate('/cocktails/random');
  };

  const authNavigation = () => {
    if (name) {
      return;
    }
    store.dispatch(configActions.setModal('signup'));
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
            {/* <NavigationSearch onChange={onChange} /> */}
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
                onClick={menuHandler}
                className={classes.magni}
              />
            </div>
            {false && (
              <>
                <Button onClick={randomCocktailHandler}>
                  <FontAwesomeIcon icon={faDice}></FontAwesomeIcon>
                </Button>
                <Link to="/add-cocktail">
                  <Button>
                    <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                  </Button>
                </Link>

                <Button onClick={toggleFavourites}>
                  <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                </Button>

                {name && (
                  <Button className={classes.yellow} onClick={authNavigation}>
                    <h4>{name}</h4>
                  </Button>
                )}
                {!name && (
                  <Button className={classes.yellow} onClick={authNavigation}>
                    <h4>Sign Up</h4>
                  </Button>
                )}
              </>
            )}
          </div>

          {/* <Settings /> */}
        </nav>
      </div>
      {children}
    </>
  );
};

export default NavigationBar;
