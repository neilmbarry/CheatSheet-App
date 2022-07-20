import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
// import { faBarsProgress } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';
// import { useRef } from 'react';
import classes from './Login.module.css';

const Login = (props) => {
  // const name = useRef();
  // const email = useRef();
  // const password = useRef();
  // const passwordConfirm = useRef();

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
  return (
    <div className={classes.main}>
      <h2>Log in to your account</h2>
      <h6>Enter your email address and password to continue.</h6>
      <div className={classes.loginBox}>
        <div className={classes.labelContainer}>
          <label name="email">Email</label>
          <input type="email" placeholder="Enter your email address" />
        </div>
        <div className={classes.labelContainer}>
          <label name="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className={classes.password}
          />
        </div>
        <Button>Log In</Button>
        <div className={classes.orBreak}>
          <span>or</span>
        </div>
        <Link to="/signUp">
          <Button className={classes.lightButton}>Sign up</Button>
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
    </div>
  );
};
export default Login;
