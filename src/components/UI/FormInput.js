import React from 'react';
import classes from './FormInput.module.css';

const FormInput = ({
  type,
  placeholder,
  changeHandler,
  loading,
  value,
  id,
  min,
  className,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder || '-placeholder-'}
        // onChange={changeHandler}
        onBlur={changeHandler}
        className={`${className} ${classes.input} ${
          loading ? classes.un : undefined
        }`}
        defaultValue={value}
        id={id}
        min={min}
        // autoFocus={true}
      />
    </>
  );
};

export default FormInput;
