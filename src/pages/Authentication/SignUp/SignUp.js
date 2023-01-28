import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/UI/Button';
import { useRef } from 'react';
import classes from './SignUp.module.css';
import { motion } from 'framer-motion';

import { authVariants as variants } from '../../../config/animationVariants';

import Tile from '../../../components/UI/Tile/Tile';
import useBetterFetch from '../../../hooks/useBetterFetch';
import store from '../../../store/store';
import configActions from '../../../store/configSlice';

const SignUp = (props) => {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirm = useRef();

  const { loading, error, data, getRequest } = useBetterFetch('users/signup');

  const navigate = useNavigate();

  const signUpHandler = () => {
    const body = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
      passwordConfirm: passwordConfirm.current.value,
    };
    getRequest({
      method: 'POST',
      body,
    });
  };

  useEffect(() => {
    if (error) {
      store.dispatch(
        configActions.setNotification({
          type: 'fail',
          message: error,
        })
      );
    }
    if (data.status === 'success') {
      store.dispatch(configActions.setToken(data.token));
      store.dispatch(
        configActions.setNotification({
          type: 'success',
          message: data.message,
        })
      );
      navigate('/');
    }
  }, [data, error]);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit={variants.exit}
      className={classes.main}
    >
      <Tile title="Create your account">
        {/* <Title
          title="Create your account"
          subtitle="Fill in the required fields to continue."
        /> */}
        <form action="" className={classes.form}>
          <div className={classes.labelContainer}>
            <label name="name">Name</label>
            <input type="name" placeholder="Enter your name" ref={name} />
          </div>
          <div className={classes.labelContainer}>
            <label name="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email address"
              ref={email}
            />
          </div>
          <div className={classes.labelContainer}>
            <label name="password">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className={classes.password}
              ref={password}
            />
          </div>
          <div className={classes.labelContainer}>
            <label name="password">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className={classes.password}
              ref={passwordConfirm}
            />
          </div>
        </form>
        <Button type="main" onClick={signUpHandler}>
          Sign Up
        </Button>
        <div className={classes.orBreak}>
          <span>or</span>
        </div>
        <Link to="/login">
          <Button className={classes.lightButton}>Log in</Button>
        </Link>
      </Tile>
    </motion.div>
  );
};
export default SignUp;
