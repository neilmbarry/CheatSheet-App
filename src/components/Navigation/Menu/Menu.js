import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import configActions from '../../../store/configSlice';
import store from '../../../store/store';
import classes from './Menu.module.css';
import MenuItem from './MenuItem';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';

const Menu = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const navigate = useNavigate();
  const showMenu = useSelector((state) => state.config.value.showMenu);
  const token = useSelector((state) => state.config.value.token);
  const backdropHandler = () => {
    return store.dispatch(configActions.setShowMenu(false));
  };

  const showAuthModal = () => {
    store.dispatch(configActions.setModal('signup'));
  };

  const navToFaves = () => {
    if (!token) return showAuthModal();
    store.dispatch(configActions.setOpenFavourites(true));
    store.dispatch(
      configActions.setNotification({
        message: 'showing faves',
        type: 'success',
      })
    );
  };
  const navToAdd = () => {
    if (!token) return showAuthModal();
    navigate('/add-cocktail');
  };

  const signOut = () => {
    store.dispatch(configActions.signOut());
    store.dispatch(
      configActions.setNotification({
        message: 'Signed out',
        type: 'info',
      })
    );
  };

  return ReactDOM.createPortal(
    showMenu && (
      <div className={classes.backdrop} onClick={backdropHandler}>
        <div className={classesList}>
          {!token && (
            <>
              <MenuItem
                name="Log in / Sign up"
                icon={faArrowRightToBracket}
                onClick={showAuthModal}
              />
              <div className={classes.divider}></div>
            </>
          )}
          <MenuItem name="Favourites" icon={faHeart} onClick={navToFaves} />
          <MenuItem
            name="Random Cocktail"
            icon={faDice}
            onClick={() => navigate('cocktails/random')}
          />
          <MenuItem
            name="Add a cocktail"
            icon={faPenToSquare}
            onClick={navToAdd}
          />
          {token && (
            <>
              <div className={classes.divider}></div>
              <MenuItem
                name="Log out"
                icon={faArrowRightFromBracket}
                onClick={signOut}
              />
            </>
          )}
        </div>
      </div>
    ),
    document.getElementById('portal')
  );
};

export default Menu;
