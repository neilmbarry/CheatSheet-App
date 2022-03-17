import React from 'react';
import classes from './FormInput.module.css';

const FormInput = (props) => {
  return (
    <>
      <input
        type={props.type}
        placeholder={props.placeholder || '-placeholder-'}
        onChange={props.changeHandler}
        className={classes.input}
        value={props.value}
      />
    </>
  );
};

export default FormInput;
