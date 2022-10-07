import React, { useEffect, useState } from 'react';
import Button from '../UI/Button';
import NavigationSearch from './NavigationSearch';
import classes from './NavigationBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import store from '../../store/store';
import { useSelector } from 'react-redux';
import { apiEndpoint } from '../../config/apiEndpoint';

const NavigationBar = ({
  onChange,
  onClick,
  onSearch,
  onSearchClick,
  toggleFav,
  children,
}) => {
  const token = useSelector((state) => state.config.value.token);

  const [name, setName] = useState(null);

  useEffect(() => {
    fetch(apiEndpoint() + 'api/v1/users/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.user?.name);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, [token]);

  return (
    <>
      <nav className={classes.nav} onClick={null}>
        <div className={classes.navLeft}>
          <NavigationSearch onChange={onChange} />
          <div onClick={onSearchClick} className={classes.magni}>
            <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
          </div>
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

          <Button onClick={toggleFav}>
            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
          </Button>

          <Link to="/login">
            <Button className={classes.yellow}>
              <h4>{name || 'Log in / Sign up'}</h4>
              {/* <FontAwesomeIcon icon={faUser}/> */}
            </Button>
          </Link>
        </div>

        {/* <Settings /> */}
      </nav>
      {children}
    </>
  );
};

export default NavigationBar;
