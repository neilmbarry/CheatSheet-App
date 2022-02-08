import React from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { useRef } from "react";

const Login = (props) => {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirm = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(
      email.current.value,
      password.current.value,
      passwordConfirm.current.value,
      name.current.value
    );
    const body = JSON.stringify({
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
      passwordConfirm: passwordConfirm.current.value,
    });
    console.log(body);
    try {
      fetch("http://127.0.0.1:8000/api/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Card>
      <label name="name">Name</label>
      <input placeholder="Enter your name" ref={name}></input>
      <label name="email">Email</label>
      <input placeholder="Enter your email" ref={email}></input>
      <label name="password">password</label>
      <input placeholder="Enter your password" ref={password}></input>
      <label name="passwordConfirm">password confirm</label>
      <input placeholder="Confirm your password" ref={passwordConfirm}></input>
      <Button onClick={submitHandler}>Sign UP</Button>
    </Card>
  );
};
export default Login;
