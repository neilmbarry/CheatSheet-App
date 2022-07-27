import React from 'react';
import classes from './LabelInput.module.css';

const LabelInput = ({
  className,
  label,
  name,
  placeholder,
  ParentRef,
  defaultValue,
  loading,
}) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <label name={label}>{name}</label>
      <input
        type="text"
        placeholder={placeholder}
        ref={ParentRef}
        defaultValue={defaultValue}
        className={loading ? classes.unavailable : undefined}
      />
    </div>
  );
};

export default LabelInput;
