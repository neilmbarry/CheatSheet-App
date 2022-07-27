import React from 'react';
import classes from './FormInput.module.css';

const FormInput = (props) => {
  return (
    <>
      <input
        type={props.type}
        placeholder={props.placeholder || '-placeholder-'}
        // onChange={props.changeHandler}
        onBlur={props.changeHandler}
        className={`${classes.input} ${props.loading ? classes.un : undefined}`}
        defaultValue={props.value}
        id={props.id}
        min={props.min}
        // autoFocus={true}
      />
    </>
  );
};

export default FormInput;
