import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
// import { faBarsProgress } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Button from '../../../components/UI/Button';
import { useRef } from 'react';
import classes from './SignUp.module.css';
import { motion } from 'framer-motion';

import { apiEndpoint } from '../../../config/apiEndpoint';

import store from '../../../store/store';
import configActions from '../../../store/configSlice';

const SignUp = (props) => {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirm = useRef();

  const signUpHandler = () => {
    const body = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
      passwordConfirm: passwordConfirm.current.value,
    };
    console.log(body);
    console.log(JSON.stringify(body));
    fetch(apiEndpoint() + 'api/v1/users/signup', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        store.dispatch(configActions.setToken(data.token));
        return console.log(data);
      })
      .catch((err) => console.warn(err));
  };

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   console.log(
  //     email.current.value,
  //     password.current.value,
  //     passwordConfirm.current.value,
  //     name.current.value
  //   );
  //   const body = JSON.stringify({
  //     name: name.current.value,
  //     email: email.current.value,
  //     password: password.current.value,
  //     passwordConfirm: passwordConfirm.current.value,
  //   });
  //   console.log(body);
  //   try {
  //     fetch('http://127.0.0.1:8000/api/v1/users/signup', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => console.log(data))
  //       .catch((err) => console.log(err));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
      <h2>Create your account</h2>
      <h6>Fill in the required fields to continue.</h6>
      <div className={classes.loginBox}>
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
        <Button onClick={signUpHandler}>Sign Up</Button>
        <div className={classes.orBreak}>
          <span>or</span>
        </div>
        <Link to="/login">
          <Button className={classes.lightButton}>Log in</Button>
        </Link>
      </div>
      {/* <label name="name">Name</label>
      <input placeholder="Enter your name" ref={name}></input>
      <label name="email">Email</label>
      <input placeholder="Enter your email" ref={email}></input>
      <label name="password">password</label>
      <input placeholder="Enter your password" ref={password}></input>
      <label name="passwordConfirm">password confirm</label>
      <input placeholder="Confirm your password" ref={passwordConfirm}></input>
      <Button onClick={submitHandler}>Sign UP</Button> */}
    </motion.div>
  );
};
export default SignUp;
