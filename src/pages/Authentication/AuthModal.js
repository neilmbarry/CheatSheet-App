// Main imports
import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Styles
import classes from './AuthModal.module.css';
import { motion } from 'framer-motion';
import { authVariants as variants } from '../../config/animationVariants';

// Components
import Button from '../../components/UI/Button';
import Tile from '../../components/UI/Tile/Tile';

// State management
import useFetch from '../../hooks/useFetch';
import store from '../../store/store';
import configActions from '../../store/configSlice';
import { useSelector } from 'react-redux';

const AuthModal = () => {
  const username = useRef();
  const password = useRef();

  const modal = useSelector((state) => state.config.value.modal);
  const { response, fetchRequest } = useFetch(`users/${modal}`);

  const authHandler = () => {
    const body = {
      username: username.current.value,
      password: password.current.value,
    };
    fetchRequest({
      method: 'POST',
      body,
    });
  };

  const switchAuth = () => {
    const switchTerm = modal === 'signup' ? 'login' : 'signup';
    store.dispatch(configActions.setModal(switchTerm));
  };

  useEffect(() => {
    if (response.error) {
      console.log(response.error);
      store.dispatch(
        configActions.setNotification({
          type: 'fail',
          message: response.error,
        })
      );
    }
    if (response.data.status === 'success') {
      store.dispatch(configActions.setUserFaves(response.data.user.faves));
      store.dispatch(configActions.setToken(response.data.token));
      store.dispatch(configActions.setId(response.data.user.id));
      store.dispatch(
        configActions.setNotification({
          type: 'success',
          message: response.data.message,
        })
      );
      store.dispatch(configActions.setModal(null));
    }
  }, [response]);

  return (
    <div className={classes.main}>
      <Tile title={modal === 'signup' ? 'Create your account' : 'Log in'}>
        <form action="" className={classes.form}>
          <div className={classes.labelContainer}>
            <label name="name">Username</label>
            <input type="text" placeholder="Enter a username" ref={username} />
          </div>

          <div className={classes.labelContainer}>
            <label name="password">Password</label>
            <input
              type="password"
              placeholder="Enter a password"
              className={classes.password}
              ref={password}
            />
          </div>
        </form>
        <Button type="main" onClick={authHandler} loading={response.loading}>
          {modal === 'signup' ? 'Sign Up' : 'Log in'}
        </Button>
        <div className={classes.orBreak}>
          <span>or</span>
        </div>

        <Button className={classes.lightButton} onClick={switchAuth}>
          {modal === 'signup' ? 'Log in' : 'Sign Up'}
        </Button>
      </Tile>
    </div>
  );
};
export default AuthModal;
