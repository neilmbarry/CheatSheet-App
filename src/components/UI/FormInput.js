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
  invalid,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder || '-placeholder-'}
        onBlur={changeHandler}
        className={`${className} ${classes.input} ${
          loading ? classes.un : undefined
        } ${invalid && classes.invalid}`}
        defaultValue={value}
        id={id}
        min={min}
      />
    </>
  );
};

export default FormInput;
