import React, { useEffect, useState } from 'react';
import Button from '../UI/Button';
import NavigationSearch from './NavigationSearch';
import classes from './NavigationBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faDice } from '@fortawesome/free-solid-svg-icons';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import store from '../../store/store';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../config/BASE_URL';
import configActions from '../../store/configSlice';

const NavigationBar = ({
  onChange,
  onClick,
  onSearch,
  onSearchClick,

  children,
}) => {
  const token = useSelector((state) => state.config.value.token);
  const slugsList = useSelector((state) => state.config.value.slugList);
  const navigate = useNavigate();

  const [name, setName] = useState(null);

  const toggleFavourites = () => {
    store.dispatch(configActions.toggleOpenFavourites());
  };

  useEffect(() => {
    if (!token) {
      return setName(null);
    }
    fetch(BASE_URL + 'users/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.warn(data);
        setName(data.user?.name);
      })
      .catch((err) => console.log(err));
  }, [token]);

  const randomCocktailHandler = () => {
    const randomEntry = Math.floor(Math.random() * slugsList.length);
    const randomCocktail = slugsList[randomEntry];

    navigate('/cocktails/' + randomCocktail);
  };

  const authNavigation = () => {
    if (name) {
      return navigate('/account');
    }
    navigate('/login');
  };

  return (
    <>
      <div className={classes.navContainer}>
        <nav className={classes.nav} onClick={null}>
          <div className={classes.navLeft}>
            <NavigationSearch onChange={onChange} />
          </div>
          <Link to="/">
            <h4 className={classes.navButton}>
              <span className={classes.yellow}>Cheat</span>
              <span className={classes.slash}>/</span>
              <span className={classes.green}>Sheet</span>
            </h4>
          </Link>
          <div className={classes.navRight}>
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

            <Button className={classes.yellow} onClick={authNavigation}>
              <h4>{name ? 'my account' : 'Log in'}</h4>
              {/* <FontAwesomeIcon icon={faUser}/> */}
            </Button>
          </div>

          {/* <Settings /> */}
        </nav>
      </div>
      {children}
    </>
  );
};

export default NavigationBar;
