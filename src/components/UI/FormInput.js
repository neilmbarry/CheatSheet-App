import React from "react";
import classes from "./FormInput.module.css";

const FormInput = (props) => {
  return (
    <>
      <input
        type={props.type}
        placeholder={props.placeholder || null}
        className={classes.input}
      />
    </>
  );
};

export default FormInput;
