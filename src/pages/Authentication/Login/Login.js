import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
// import { faBarsProgress } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Button from '../../../components/UI/Button';
import { useRef } from 'react';
import classes from './Login.module.css';
import { motion } from 'framer-motion';

import Title from '../../../components/UI/Title/Title';

import { BASE_URL } from '../../../config/BASE_URL';
import store from '../../../store/store';
import configActions from '../../../store/configSlice';
import Tile from '../../../components/UI/Tile/Tile';

const Login = (props) => {
  // const name = useRef();
  const email = useRef();
  const password = useRef();
  // const passwordConfirm = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(email.current.value, password.current.value);
    const body = JSON.stringify({
      email: email.current.value,
      password: password.current.value,
    });
    console.log(body);
    try {
      fetch(`${BASE_URL}users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          store.dispatch(configActions.setToken(data.token));
          store.dispatch(configActions.setId(data.user._id));
          // store.dispatch(configActions.setModal('successAuth'));
          store.dispatch(
            configActions.setNotification({
              type: 'success',
              message: 'You were successfully logged in!',
            })
          );
        })
        .catch((err) => {
          console.log(err);
          // store.dispatch(configActions.setModal('failAuth'));
          store.dispatch(
            configActions.setNotification({
              type: 'fail',
              message: 'You could not be logged in!',
            })
          );
        });
    } catch (err) {}
  };
  const variants = {
    hidden: {
      x: 50,
      opacity: 0,
      // scale: 0.8,

      // rotate: "0deg",
    },
    visible: {
      x: 0,
      opacity: 1,

      transition: {
        type: 'spring',
        // delay: 0.5,
        duration: 0.5,
      },
    },
    exit: {
      x: -50,
      opacity: 0,
      // scale: 0.9,
      transition: {
        type: 'spring',
        // delay: 0.5,
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit={variants.exit}
      className={classes.main}
    >
      <Tile title="Log in to your account">
        {/* <Title
          title="Log in to your account"
          subtitle="Enter your email address and password to continue."
        /> */}

        <form action="" className={classes.form}>
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
        </form>
        <Button type={'main'} onClick={submitHandler}>
          Log In
        </Button>
        <div className={classes.orBreak}>
          <span>or</span>
        </div>
        <Link to="/signUp">
          <Button className={classes.lightButton}>Sign up</Button>
        </Link>
        {/* </div> */}
      </Tile>
    </motion.div>
  );
};
export default Login;
